import { LoadingSpinner } from '&/common/components/spinners'

export function MainLoadingScreen() {
  return (
    <div className="mt-14 pt-[34vh]">
      <LoadingSpinner isLoading={true} />
    </div>
  )
}
