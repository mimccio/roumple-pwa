import educationImg from '&/assets/illustrations/education.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function EmptyItem() {
  return <EmptyScreen text="Select an item to view the details" image={educationImg} />
}
