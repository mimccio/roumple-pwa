import { useTranslation } from 'react-i18next'
import fatalErrorImg from '@/assets/illustrations/fatal-error.png'
import { EmptyScreen } from '@/common/components/empty-screen'

export function FatalError() {
  const { t } = useTranslation('error')
  return <EmptyScreen opacity text={t('anErrorOcurred')} image={fatalErrorImg} />
}
