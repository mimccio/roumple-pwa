import { EmptyDetailsLayout } from './parts/empty-details-layout'
import { LoadingSpinner } from '../../spinners'

export function DetailsLoading() {
  return (
    <EmptyDetailsLayout>
      <LoadingSpinner isLoading={true} />
    </EmptyDetailsLayout>
  )
}
