import { useTranslation } from 'react-i18next'
import error404Img from '&/assets/illustrations/error-404.png'
import { Illustration } from './parts/illustration'
import { EmptyDetailsLayout } from './parts/empty-details-layout'

export function DetailsNotFound() {
  const { t } = useTranslation('error')
  return (
    <EmptyDetailsLayout>
      <Illustration text={t('notFound')} image={error404Img} />
    </EmptyDetailsLayout>
  )
}
