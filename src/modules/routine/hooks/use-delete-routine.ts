import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { deleteRoutine } from '../mutations'

export function useDeleteRoutine() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const date = startOfToday()

  const { mutate } = useMutation(deleteRoutine, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(data.id) })

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(data.id), undefined)

      // 🗃️ Update Routine List
      const previousRoutineList = queryClient.getQueryData(ROUTINE_KEYS.list({ archived: data.archived }))
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: data.archived }), (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
      })

      // 🏫 Update Routine Board
      const previousBoardRoutines = queryClient.getQueryData(ROUTINE_KEYS.board({ type: data.type, date }))
      queryClient.setQueryData(ROUTINE_KEYS.board({ type: data.type, date }), (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
      })

      navigate('/routines')
      return { previousRoutineList, previousBoardRoutines }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.id), item)
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: item.archived }), context?.previousRoutineList)
      queryClient.setQueryData(ROUTINE_KEYS.board({ type: item.type, date }), context?.previousBoardRoutines)
      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(variables.id))
      queryClient.invalidateQueries(ROUTINE_KEYS.list({ archived: variables.archived }))
      queryClient.invalidateQueries(ROUTINE_KEYS.board({ type: variables.type, date }))
    },
  })

  const onDeleteRoutine = (routine: Routine) => mutate(routine)
  return { onDeleteRoutine }
}
