import { useTranslation } from 'react-i18next'
import fatalErrorImg from '&/assets/illustrations/fatal-error.png'
import { Illustration } from './parts/illustration'
import { EmptyDetailsLayout } from './parts/empty-details-layout'

export function DetailsError() {
  const { t } = useTranslation('error')
  return (
    <EmptyDetailsLayout>
      <Illustration text={t('anErrorOcurred')} image={fatalErrorImg} />
    </EmptyDetailsLayout>
  )
}
