import { MainListLayout } from '../../layouts'
import { ListSkeleton } from '../../skeletons'

export function MainListLoading() {
  return (
    <MainListLayout>
      <ListSkeleton />
    </MainListLayout>
  )
}
