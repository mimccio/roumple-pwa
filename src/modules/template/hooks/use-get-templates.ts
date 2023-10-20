import { useQuery } from '@tanstack/react-query'

import { TEMPLATE_KEYS } from '../constants'
import { fetchTemplates } from '../queries'

export function useGetTemplates() {
  const { data, isLoading, error } = useQuery(TEMPLATE_KEYS.list(), fetchTemplates)

  return { templateList: data, isLoading, error }
}
