import fatalErrorImg from '&/assets/illustrations/fatal-error.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function FatalError() {
  return <EmptyScreen opacity text="An error occurred" image={fatalErrorImg} />
}
