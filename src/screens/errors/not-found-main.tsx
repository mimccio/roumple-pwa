import error404Img from '&/assets/illustrations/error-404.png'
import { EmptyScreen } from '&/common/components/empty-screen'

export function NotFoundMain() {
  return <EmptyScreen text="Oooops ! This page does not exist" image={error404Img} />
}
