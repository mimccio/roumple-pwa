import type { Routine } from '../types'
import { editRoutineDescription } from '../mutations'
import { JSONContent } from '@tiptap/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodayDate } from '&/common/utils'
import { BOARD, LIST, ROUTINE } from '../constants'
import { sortRoutines } from '../utils'
import { toast } from 'react-hot-toast'

export function useEditRoutineDescription(routine: Routine) {
  const queryClient = useQueryClient()
  const date = getTodayDate()

  const { mutate } = useMutation(editRoutineDescription, {
    onMutate: async (data) => {
      const newRoutine = { ...routine, description: data.description }

      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      queryClient.setQueryData([ROUTINE, data.id], newRoutine)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: data.archived }])

      queryClient.setQueryData([ROUTINE, LIST, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [
          ...old.slice(0, routineIndex),
          { ...old[routineIndex], ...newRoutine },
          ...old.slice(routineIndex + 1),
        ].sort(sortRoutines)
      })

      const previousBoardRoutineList = queryClient.getQueryData([ROUTINE, BOARD, { type: data.type, date }])
      queryClient.setQueryData([ROUTINE, BOARD, { type: data.type, date }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [
          ...old.slice(0, routineIndex),
          { ...old[routineIndex], ...newRoutine },
          ...old.slice(routineIndex + 1),
        ].sort(sortRoutines)
      })

      return { previousRoutineList, previousBoardRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, LIST, { archived: item.archived }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { type: item.type, date }], context?.previousBoardRoutineList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: variables.id }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: variables.type, date }])
    },
  })

  const submit = (description?: JSONContent) => mutate({ ...routine, description })
  return { submit }
}
