import { useTranslation } from 'react-i18next'
import educationImg from '&/assets/illustrations/education.png'
import { Illustration } from '.'

export function IllustrationSelectItem() {
  const { t } = useTranslation('empty')
  return <Illustration text={t('selectItemToViewDetails')} image={educationImg} />
}
