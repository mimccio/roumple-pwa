import { useTranslation } from 'react-i18next'
import animalCareImg from '&/assets/illustrations/animal-care.png'
import { Illustration } from '.'

export function IllustrationOffline() {
  const { t } = useTranslation('error')
  return <Illustration text={t('offlineNoData')} image={animalCareImg} />
}
