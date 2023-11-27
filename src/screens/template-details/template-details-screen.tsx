import { Route, Routes } from 'react-router-dom'

import { DetailsLoadingPage } from '@/common/components/details-loading-page'
import { useTemplate } from '@/modules/template/hooks'
import { NotFoundScreen } from '@/screens/errors'
import { Details } from './screens/details'
import { Creating } from './screens/creating'

export function TemplateDetailsScreen() {
  const { template, isLoading, error, onUseTemplate, status } = useTemplate()

  if (!template || error) return <NotFoundScreen />
  if (isLoading) return <DetailsLoadingPage />
  return (
    <Routes>
      <Route index element={<Details template={template} onUseTemplate={onUseTemplate} />} />
      <Route path="creating" element={<Creating status={status} template={template} />} />
    </Routes>
  )
}
