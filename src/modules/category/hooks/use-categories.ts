import { useQuery } from '@tanstack/react-query'

import { CATEGORY_LIST } from '../constants'
import { fetchCategories } from '../queries'

export function useCategories() {
  const { data, isLoading, error } = useQuery([CATEGORY_LIST], fetchCategories)

  return { categoryList: data, isLoading, error }
}
