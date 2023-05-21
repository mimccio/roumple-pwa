import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveRoutine } from '../mutations/archive-routine'
import { ROUTINE } from '../constants'
import { Routine } from '../types'
import { sortRoutines } from '../utils'
import { toast } from 'react-hot-toast'

export function useArchiveRoutine() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(archiveRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      queryClient.setQueryData([ROUTINE, data.id], () => data)

      const previousArchivedRoutineList = queryClient.getQueryData([ROUTINE, { archived: true }])
      const previousRoutineList = queryClient.getQueryData([ROUTINE, { archived: false }])

      queryClient.setQueryData([ROUTINE, { archived: true }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        if (routineIndex >= 0) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        return [...old, data].sort(sortRoutines)
      })

      queryClient.setQueryData([ROUTINE, { archived: false }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        if (routineIndex >= 0) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        return [...old, data].sort(sortRoutines)
      })

      return { previousArchivedRoutineList, previousRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, { archived: false }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, { archived: true }], context?.previousArchivedRoutineList)
      toast.error("Archive didn't work")
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, { archived: false }])
      queryClient.invalidateQueries([ROUTINE, { archived: true }])
    },
  })

  const handleArchiveRoutine = (routine: Routine) => mutate({ ...routine, archived: !routine.archived })

  return { handleArchiveRoutine }
}
