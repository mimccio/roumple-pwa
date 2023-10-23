import { LoadingSpinner } from './spinners'

export function DetailsLoadingPage() {
  return (
    <div className="pt-[34vh]">
      <LoadingSpinner isLoading={true} />
    </div>
  )
}
