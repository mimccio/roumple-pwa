import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { TEMPLATE_KEYS } from '../constants'
import { fetchTemplateDetails } from '../queries'

export function useGetTemplateDetails() {
  const { templateId } = useParams()
  const { data, isLoading, error } = useQuery(TEMPLATE_KEYS.detail(templateId), fetchTemplateDetails)

  return { template: data, isLoading, error }
}
