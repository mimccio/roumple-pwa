import { useTranslation } from 'react-i18next'
import error404Img from '&/assets/illustrations/error-404.png'
import { Illustration } from '.'

export function IllustrationNotFound() {
  const { t } = useTranslation('error')
  return <Illustration text={t('notFound')} image={error404Img} />
}
