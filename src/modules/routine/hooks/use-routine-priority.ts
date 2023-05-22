import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { sortRoutines } from '../utils'
import { editRoutinePriority } from '../mutations'
import { getTodayDate } from '&/common/utils'

export function useRoutinePriority(routine: Routine) {
  const queryClient = useQueryClient()
  const date = getTodayDate()

  const { mutate } = useMutation(editRoutinePriority, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      queryClient.setQueryData([ROUTINE, data.id], () => data)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, { archived: data.archived }])
      const previousBoardRoutines = queryClient.getQueryData([ROUTINE, { date, type: data.type }])

      queryClient.setQueryData([ROUTINE, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)].sort(sortRoutines)
      })

      queryClient.setQueryData([ROUTINE, { date, type: data.type }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)].sort(sortRoutines)
      })

      return { previousRoutineList, previousBoardRoutines }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, { archived: item.archived }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, { date, type: item.type }], context?.previousBoardRoutines)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, { archived: variables.archived }])
      queryClient.invalidateQueries([ROUTINE, { date, type: variables.type }])
    },
  })

  const onSelect = (priority: number) => mutate({ ...routine, priority })

  return { onSelect }
}
