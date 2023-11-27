import { useAtom } from 'jotai'

import type { Category } from '@/modules/category/types'
import { useCategories } from '@/modules/category/hooks'
import { categoryAtom } from '@/modules/category/atoms'

import type { Routine } from '../types'
import { editRoutineCategory } from '../mutations'
import { useMutateRoutine } from './use-mutate-routine'

export function useRoutineCategory(routine: Routine) {
  const { categoryList, isLoading, error } = useCategories()
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom)

  const { mutate } = useMutateRoutine(editRoutineCategory)

  const onSelect = (cat: Category) => {
    const category = cat.id ? cat : null
    mutate({ ...routine, category })
    // update selected category if there is one selected
    if (selectedCategory?.id) {
      setSelectedCategory(category)
    }
  }

  return { onSelect, categoryList, isLoading, error }
}
