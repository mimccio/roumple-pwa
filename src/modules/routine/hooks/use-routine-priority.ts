import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { sortRoutines } from '../utils'
import { editRoutinePriority } from '../mutations'

export function useRoutinePriority(routine: Routine) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutinePriority, {
    onMutate: async (data) => {
      console.log('data :', data)
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      queryClient.setQueryData([ROUTINE, data.id], () => data)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, { archived: data.archived }])

      queryClient.setQueryData([ROUTINE, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)].sort(sortRoutines)
      })

      return { previousRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, { archived: item.archived }], context?.previousRoutineList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, { archived: variables.archived }])
    },
  })

  const onSelect = (priority: number) => mutate({ ...routine, priority })

  return { onSelect }
}
