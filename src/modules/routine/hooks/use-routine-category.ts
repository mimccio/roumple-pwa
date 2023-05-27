import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Category } from '&/modules/category/types'
import { getTodayDate } from '&/common/utils'
import { useCategories } from '&/modules/category/hooks'

import type { Routine } from '../types'
import { BOARD, LIST, ROUTINE } from '../constants'
import { editRoutineCategory } from '../mutations'

export function useRoutineCategory(routine: Routine) {
  const queryClient = useQueryClient()
  const date = getTodayDate()
  const { categories, isLoading, error } = useCategories()

  const { mutate } = useMutation(editRoutineCategory, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      queryClient.setQueryData([ROUTINE, data.id], () => data)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: data.archived }])
      const previousBoardRoutines = queryClient.getQueryData([ROUTINE, BOARD, { date, type: data.type }])

      queryClient.setQueryData([ROUTINE, LIST, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)]
      })

      queryClient.setQueryData([ROUTINE, BOARD, { date, type: data.type }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)]
      })

      return { previousRoutineList, previousBoardRoutines }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, LIST, { archived: item.archived }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { date, type: item.type }], context?.previousBoardRoutines)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: variables.archived }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { date, type: variables.type }])
    },
  })

  const onSelect = (category: Category) => mutate({ ...routine, category })

  return { onSelect, categories, isLoading, error }
}
