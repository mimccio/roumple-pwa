import { useQuery } from '@tanstack/react-query'

import { useGetLanguage } from '@/common/hooks'
import { TEMPLATE_KEYS } from '../constants'
import { fetchTemplates } from '../queries'

export function useGetTemplates() {
  const lang = useGetLanguage()

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: TEMPLATE_KEYS.list({ lang }),
    queryFn: fetchTemplates,
  })

  return { templateList: data, isLoading: isLoading || isFetching, error }
}
