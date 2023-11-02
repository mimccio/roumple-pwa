import { LoadingSpinner } from './spinners'

export function DetailsLoadingPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <LoadingSpinner isLoading={true} />
    </div>
  )
}
