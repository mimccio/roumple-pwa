import { useTranslation } from 'react-i18next'
import error404Img from '@/assets/illustrations/error-404.png'
import { Illustration } from '@/common/components/illustrations'
import { FallbackLayout } from './components/fallback-layout'

export function NotFoundFallback() {
  const { t } = useTranslation('error')

  return (
    <FallbackLayout>
      <Illustration text={t('pageDoenstExists')} image={error404Img} />
    </FallbackLayout>
  )
}
