import { useMutation, useQueryClient } from '@tanstack/react-query'
import { startOfToday } from 'date-fns'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { archiveRoutine } from '../mutations'

export function useArchiveRoutine() {
  const queryClient = useQueryClient()
  const date = startOfToday()

  const { mutate } = useMutation(archiveRoutine, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(data.id), data)

      // 🗄️ Update Archived list
      const previousArchivedRoutineList = queryClient.getQueryData(ROUTINE_KEYS.list({ archived: true }))
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: true }), (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        if (routineIndex >= 0) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        return [...old, data]
      })

      // 🗃️ Update NOT Archived list
      const previousRoutineList = queryClient.getQueryData(ROUTINE_KEYS.list({ archived: false }))
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: false }), (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        if (routineIndex >= 0) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        return [...old, data]
      })

      // 🏫 Update Bard list
      const previousBoardRoutineList = queryClient.getQueryData(
        ROUTINE_KEYS.board({ date, scheduleType: data.scheduleType })
      )
      queryClient.setQueryData(ROUTINE_KEYS.board({ date, scheduleType: data.scheduleType }), (old: Routine[] = []) => {
        if (data.archived) {
          const routineIndex = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        }
        return [...old, data]
      })

      return { previousArchivedRoutineList, previousRoutineList, previousBoardRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.id), { ...item, archived: !item.archived })
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: false }), context?.previousRoutineList)
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: true }), context?.previousArchivedRoutineList)
      queryClient.setQueryData(
        ROUTINE_KEYS.board({ date, scheduleType: item.scheduleType }),
        context?.previousBoardRoutineList
      )
      toast.error("Archive didn't work")
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(variables.id))
      queryClient.invalidateQueries(ROUTINE_KEYS.list({ archived: false }))
      queryClient.invalidateQueries(ROUTINE_KEYS.list({ archived: true }))
      queryClient.invalidateQueries(ROUTINE_KEYS.board({ date, scheduleType: variables.scheduleType }))
    },
  })

  const handleArchiveRoutine = (routine: Routine) => mutate({ ...routine, archived: !routine.archived })

  return { handleArchiveRoutine }
}
