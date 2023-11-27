import { IllustrationNotFound } from '@/common/components/illustrations'
import { FallbackLayout } from './components/fallback-layout'

export function NotFoundFallback() {
  return (
    <FallbackLayout>
      <IllustrationNotFound />
    </FallbackLayout>
  )
}
