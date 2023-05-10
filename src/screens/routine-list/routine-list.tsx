import { ContentLayout } from '&/common/components/layouts/content-layout'
import { Header } from './header'
import { List } from './list'

export function RoutineList() {
  return (
    <>
      <Header />
      <ContentLayout>
        <List />
      </ContentLayout>
    </>
  )
}
