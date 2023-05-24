import animalCareImg from '&/assets/illustrations/animal-care.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function OfflineError() {
  return <EmptyScreen text="We're offline and have no data to show" image={animalCareImg} />
}
