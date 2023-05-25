import error404Img from '&/assets/illustrations/error-404.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function NotFoundDetails() {
  return <EmptyScreen opacity text="Not found" image={error404Img} />
}
