import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { upsertRoutineAction } from '../mutations'
import type { BoardType, Routine, ScheduleType, UpdateStatusParams } from '../types'
import { ROUTINE } from '../constants'

interface Params {
  date: Date
  type: ScheduleType
  boardType: BoardType
}

export function useUpsertAction({ date, type, boardType }: Params) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(upsertRoutineAction, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, boardType], exact: false })

      const previousList = queryClient.getQueryData([ROUTINE, boardType, { date, type }])

      const newRoutine = {
        ...data.routine,
        actions: [{ ...data.routine.actions?.[0], done: !data.routine.actions?.[0]?.done }],
      }

      queryClient.setQueryData<Routine[]>([ROUTINE, boardType, { type, date }], (old) => {
        if (!old) return
        const index = old.findIndex((item) => item.id === data.routine.id)
        if (index >= 0) return [...old.slice(0, index), newRoutine, ...old.slice(index + 1)]
        return old
      })

      return { previousList }
    },
    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE, boardType, { date, done: true, type }], context?.previousList)
      toast.error('Error on check routine')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINE, boardType], exact: false })
    },
  })

  const handleUpdateStatus = ({ routine, actionId, done }: UpdateStatusParams) =>
    mutate({ routine, actionId, done, type, date })

  return { handleUpdateStatus }
}
