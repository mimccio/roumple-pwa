import { useAtom } from 'jotai'

import type { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import { useCategories } from '&/modules/category/hooks'

import type { Task } from '../types'
import { editTaskCategory } from '../mutations'
import { useMutateTask } from '.'

export function useTaskCategory(task: Task) {
  const { categoryList, isLoading, error } = useCategories()
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom)

  const { mutate } = useMutateTask(editTaskCategory)

  const onSelect = (category: Category) => {
    mutate({ ...task, category })
    // update selected category if there is one selected
    if (selectedCategory?.id) {
      setSelectedCategory(category)
    }
  }

  return { onSelect, categoryList, isLoading, error }
}
