import { useQuery } from '@tanstack/react-query'

import { TEMPLATE_KEYS } from '../constants'
import { fetchTemplates } from '../queries'

export function useGetTemplates() {
  const lang = navigator.language.slice(0, 2)

  const { data, isLoading, error } = useQuery(TEMPLATE_KEYS.list({ lang }), fetchTemplates)

  return { templateList: data, isLoading, error }
}
