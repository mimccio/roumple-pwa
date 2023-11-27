import { LoadingSpinner } from '@/common/components/spinners'

export function MainLoadingScreen() {
  return (
    <div className="flex justify-center">
      <LoadingSpinner isLoading={true} />
    </div>
  )
}
