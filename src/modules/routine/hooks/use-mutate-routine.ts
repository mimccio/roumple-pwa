import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutateRoutine(mutation: (routine: Routine) => any) {
  const queryClient = useQueryClient()
  const date = startOfToday()

  const { mutate } = useMutation(mutation, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(data.id) })

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(data.id), data)

      // 🗃️ Update Routine List
      const listKey = ROUTINE_KEYS.list({ archived: data.archived })
      const previousRoutineList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)]
      })

      // 🏫 Update Routine Board
      const boardKey = ROUTINE_KEYS.board({ scheduleType: data.scheduleType, date })
      const previousBoardRoutineList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)]
      })

      return { previousRoutineList, previousBoardRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.id), item)
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: item.archived }), context?.previousRoutineList)
      queryClient.setQueryData(
        ROUTINE_KEYS.board({ scheduleType: item.scheduleType, date }),
        context?.previousBoardRoutineList
      )
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(variables.id))
      queryClient.invalidateQueries(ROUTINE_KEYS.list({ archived: variables.archived }))
      queryClient.invalidateQueries(ROUTINE_KEYS.board({ scheduleType: variables.scheduleType, date }))
    },
  })

  return { mutate }
}
