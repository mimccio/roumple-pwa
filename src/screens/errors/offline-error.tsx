import { useTranslation } from 'react-i18next'
import animalCareImg from '&/assets/illustrations/animal-care.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function OfflineError() {
  const { t } = useTranslation('error')
  return <EmptyScreen opacity text={t('offlineNoData')} image={animalCareImg} />
}
