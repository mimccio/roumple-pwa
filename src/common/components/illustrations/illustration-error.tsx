import { useTranslation } from 'react-i18next'
import fatalErrorImg from '&/assets/illustrations/fatal-error.png'
import { Illustration } from '.'

export function IllustrationError() {
  const { t } = useTranslation('error')
  return <Illustration text={t('anErrorOcurred')} image={fatalErrorImg} />
}
