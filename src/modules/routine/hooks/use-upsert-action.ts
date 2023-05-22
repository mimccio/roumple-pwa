import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { upsertRoutineAction } from '../mutations'
import type { Routine, ScheduleType, UpdateStatusParams } from '../types'
import { ROUTINE } from '../constants'
import { getTodayDate } from '&/common/utils'

interface Params {
  type: ScheduleType
  date: Date
}

export function useUpsertAction({ type, date }: Params) {
  // const date = getTodayDate()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(upsertRoutineAction, {
    onMutate: async (data) => {
      console.log('data :', data)

      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      const previousList = queryClient.getQueryData([ROUTINE, { date, type }])

      const newRoutine = {
        ...data.routine,
        actions: [{ ...data.routine.actions?.[0], done: !data.routine.actions?.[0]?.done }],
      }
      queryClient.setQueryData<Routine>([ROUTINE, data.routine.id], () => newRoutine)

      queryClient.setQueryData<Routine[]>([ROUTINE, { type, date }], (old) => {
        console.log('old :', old)
        if (!old) return
        const index = old.findIndex((item) => item.id === data.routine.id)
        console.log('index :', index)
        if (index >= 0) return [...old.slice(0, index), newRoutine, ...old.slice(index + 1)]
        return old
      })

      return { previousList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, { date, type }], context?.previousList)
      queryClient.setQueryData([ROUTINE, item.routine.id], item.routine)
      toast.error('Error on check routine')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ROUTINE, { date, type }], exact: false })
      queryClient.invalidateQueries({ queryKey: [ROUTINE, variables.routine.id] })
    },
  })

  const handleUpdateStatus = ({ routine, actionId, done }: UpdateStatusParams) =>
    mutate({ routine, actionId, done, type, date })

  return { handleUpdateStatus }
}
