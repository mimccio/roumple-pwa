import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { TwColor } from '&/common/types'
import type { Category } from '../types'
import { CATEGORY_LIST } from '../constants'
import { editCategory } from '../mutations'
import { ROUTINE_KEYS } from '&/modules/routine/constants'
import { Routine } from '&/modules/routine/types'
import { TASK_KEYS } from '&/modules/task/constants'
import { Task } from '&/modules/task/types'

interface Params {
  category: Category
}

export function useEditCategory({ category }: Params) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editCategory, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.boards(), exact: false })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.details(), exact: false })

      // Update Category List
      const previousCategoryList = queryClient.getQueryData([CATEGORY_LIST])
      queryClient.setQueryData([CATEGORY_LIST], (old: Category[] = []) => {
        const categoryIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, categoryIndex), data, ...old.slice(categoryIndex + 1)]
      })

      // Update Routines
      queryClient.setQueriesData(ROUTINE_KEYS.lists(), (old: Routine[] = []) => {
        return old.map((routine) => (routine.category?.id === data.id ? { ...routine, category: data } : routine))
      })
      queryClient.setQueriesData(ROUTINE_KEYS.boards(), (old: Routine[] = []) => {
        return old.map((routine) => (routine.category?.id === data.id ? { ...routine, category: data } : routine))
      })
      queryClient.setQueriesData(ROUTINE_KEYS.details(), (old?: Routine) =>
        old?.category?.id === data.id ? { ...old, category: data } : old
      )

      // Update Tasks
      queryClient.setQueriesData(TASK_KEYS.lists(), (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === data.id ? { ...task, category: data } : task))
      })
      queryClient.setQueriesData(TASK_KEYS.boards(), (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === data.id ? { ...task, category: data } : task))
      })
      queryClient.setQueriesData(TASK_KEYS.details(), (old?: Task) =>
        old?.category?.id === data.id ? { ...old, category: data } : old
      )

      return { previousCategoryList, category }
    },

    onError: (_err, item, context) => {
      // Update Category List
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)

      if (!context?.category) {
        console.error('context.category is undefined')
        return
      }

      // Update Routines
      queryClient.setQueriesData(ROUTINE_KEYS.lists(), (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.category?.id === item.id ? { ...routine, category: context.category } : routine
        )
      })
      queryClient.setQueriesData(ROUTINE_KEYS.boards(), (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.category?.id === item.id ? { ...routine, category: context.category } : routine
        )
      })
      queryClient.setQueriesData(ROUTINE_KEYS.details(), (old?: Routine) =>
        old?.category?.id === item.id ? { ...old, category: context.category } : old
      )

      // Update Tasks
      queryClient.setQueriesData(TASK_KEYS.lists(), (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === item.id ? { ...task, category: context.category } : task))
      })
      queryClient.setQueriesData(TASK_KEYS.boards(), (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === item.id ? { ...task, category: context.category } : task))
      })
      queryClient.setQueriesData(TASK_KEYS.details(), (old?: Task) =>
        old?.category?.id === item.id ? { ...old, category: context.category } : old
      )

      toast.error("Modification didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries([CATEGORY_LIST])
      queryClient.invalidateQueries(ROUTINE_KEYS.lists())
      queryClient.invalidateQueries(ROUTINE_KEYS.boards())
      queryClient.invalidateQueries(ROUTINE_KEYS.details())
      queryClient.invalidateQueries(TASK_KEYS.lists())
      queryClient.invalidateQueries(TASK_KEYS.boards())
      queryClient.invalidateQueries(TASK_KEYS.details())
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    values: category,
    mode: 'onBlur',
  })

  const submit = handleSubmit((formData) => mutate({ ...category, ...formData }))
  const handleColorChange = (color: TwColor) => mutate({ ...category, color })

  return { handleColorChange, errors, register, submit }
}
