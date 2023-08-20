import { useTranslation } from 'react-i18next'
import educationImg from '&/assets/illustrations/education.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function EmptyItem() {
  const { t } = useTranslation('empty')
  return <EmptyScreen opacity text={t('selectItemToViewDetails')} image={educationImg} />
}
