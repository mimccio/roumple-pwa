import { useTranslation } from 'react-i18next'
import fatalErrorImg from '@/assets/illustrations/fatal-error.png'
import { Illustration } from '../../illustrations'
import { MainListFallbackLayout } from './main-list-fallback-layout'

export function MainListError() {
  const { t } = useTranslation('error')

  return (
    <MainListFallbackLayout>
      <Illustration text={t('anErrorOcurred')} image={fatalErrorImg} />
    </MainListFallbackLayout>
  )
}
