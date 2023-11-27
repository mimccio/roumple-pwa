import { IllustrationError } from '@/common/components/illustrations'
import { FallbackLayout } from './components/fallback-layout'

export function ErrorFallback() {
  return (
    <FallbackLayout>
      <IllustrationError />
    </FallbackLayout>
  )
}
