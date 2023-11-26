import { LoadingSpinner } from './spinners'

export function DetailsLoadingPage() {
  return (
    <div className="flex grow items-center justify-center border-t border-gray-200 pt-1">
      <LoadingSpinner isLoading={true} />
    </div>
  )
}
