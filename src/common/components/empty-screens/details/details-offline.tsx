import { useTranslation } from 'react-i18next'
import animalCareImg from '&/assets/illustrations/animal-care.png'
import { Illustration } from './parts/illustration'
import { EmptyDetailsLayout } from './parts/empty-details-layout'

export function DetailsOffline() {
  const { t } = useTranslation('error')
  return (
    <EmptyDetailsLayout>
      <Illustration text={t('offlineNoData')} image={animalCareImg} />
    </EmptyDetailsLayout>
  )
}
