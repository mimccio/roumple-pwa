import { useTranslation } from 'react-i18next'
import error404Img from '&/assets/illustrations/error-404.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function NotFoundMain() {
  const { t } = useTranslation('error')
  return <EmptyScreen text={t('pageDoenstExists')} image={error404Img} />
}
