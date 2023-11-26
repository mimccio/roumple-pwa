import { IllustrationError, IllustrationNotFound, IllustrationOffline } from '../../illustrations'
import { LoadingSpinner } from '../../spinners'
import { DetailsFallbackLayout } from './details-fallback-layout'

interface Props {
  isLoading: boolean
  isPaused: boolean
  isError?: boolean
  data?: object
}

export function DetailsFallback({ isLoading, isPaused, data, isError }: Props) {
  if (data) return null

  return (
    <DetailsFallbackLayout>
      {isLoading ? (
        <LoadingSpinner isLoading={true} />
      ) : isPaused ? (
        <IllustrationOffline />
      ) : isError ? (
        <IllustrationError />
      ) : (
        <IllustrationNotFound />
      )}
    </DetailsFallbackLayout>
  )
}
