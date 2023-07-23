import { useTranslation } from 'react-i18next'
import sciencesImg from '&/assets/illustrations/sciences.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function SettingsDetails() {
  const { t } = useTranslation('common')
  return <EmptyScreen opacity text={t('settings')} image={sciencesImg} />
}
