import { useTranslation } from 'react-i18next'

import designImg from '&/assets/illustrations/design.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function CategoryDetailsScreen() {
  const { t } = useTranslation('common')
  return <EmptyScreen opacity text={t('categories')} image={designImg} />
}
