import { useQuery } from '@tanstack/react-query'

import { CATEGORY_LIST } from '../constants'
import { fetchCategories } from '../queries'

export function useCategories() {
  const { data, isLoading, error } = useQuery({ queryKey: [CATEGORY_LIST], queryFn: fetchCategories })

  return { categoryList: data, isLoading, error }
}
