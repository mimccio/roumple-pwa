import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveRoutine } from '../mutations/archive-routine'
import { BOARD, LIST, ROUTINE } from '../constants'
import { Routine } from '../types'
import { sortRoutines } from '../utils'
import { toast } from 'react-hot-toast'
import { getTodayDate } from '&/common/utils'

export function useArchiveRoutine() {
  const queryClient = useQueryClient()
  const date = getTodayDate()

  const { mutate } = useMutation(archiveRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      queryClient.setQueryData([ROUTINE, data.id], () => data)

      const previousArchivedRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: true }])
      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: false }])

      queryClient.setQueryData([ROUTINE, LIST, { archived: true }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        if (routineIndex >= 0) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        return [...old, data].sort(sortRoutines)
      })

      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        if (routineIndex >= 0) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        return [...old, data].sort(sortRoutines)
      })

      const previousBoardRoutineList = queryClient.getQueryData([ROUTINE, BOARD, { type: data.type, date }])
      queryClient.setQueryData([ROUTINE, BOARD, { type: data.type, date }], (old: Routine[] = []) => {
        if (data.archived) {
          const routineIndex = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)].sort(sortRoutines)
        }
        return [...old, data].sort(sortRoutines)
      })

      return { previousArchivedRoutineList, previousRoutineList, previousBoardRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, LIST, { archived: true }], context?.previousArchivedRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { type: item.type, date }], context?.previousBoardRoutineList)
      toast.error("Archive didn't work")
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: false }])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: true }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: variables.type, date }])
    },
  })

  const handleArchiveRoutine = (routine: Routine) => mutate({ ...routine, archived: !routine.archived })

  return { handleArchiveRoutine }
}
