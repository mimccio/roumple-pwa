import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { toast } from 'react-hot-toast'

import type { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import { useCategories } from '&/modules/category/hooks'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { editTaskCategory } from '../mutations'

// TODO: BOARD

export function useTaskCategory(task: Task) {
  const queryClient = useQueryClient()
  const { categoryList, isLoading, error } = useCategories()
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom)

  const { mutate } = useMutation(editTaskCategory, {
    onMutate: async (data) => {
      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list() })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), () => data)

      // Update task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list())
      queryClient.setQueryData(TASK_KEYS.list(), (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })

      return { previousTaskList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list(), context?.previousTaskList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
      queryClient.invalidateQueries(TASK_KEYS.list())
    },
  })

  const onSelect = (category: Category) => {
    mutate({ ...task, category })
    // update selected category if there is one selected
    if (selectedCategory?.id) {
      setSelectedCategory(category)
    }
  }

  return { onSelect, categoryList, isLoading, error }
}
