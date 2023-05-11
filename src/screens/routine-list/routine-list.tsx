import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout } from '&/common/components/layouts/content-layout'
import { EmptyMainContent } from '&/common/components/empty-main-content'
import { useRoutines } from '&/modules/routine/hooks'
import { Header } from './header'
import { Item } from './item'

export function RoutineList() {
  const { routines, isLoading } = useRoutines()

  return (
    <>
      <Header />
      <ContentLayout>
        {!isLoading && !routines?.length && (
          <EmptyMainContent header to="d/routine/new" text="Create a new routine +" image={workflowImg} />
        )}
        <div className="flex flex-col gap-4 px-2">
          {isLoading && <ListSkeleton />}
          {routines?.map((routine) => (
            <Item key={routine.id} routine={routine} />
          ))}
        </div>
      </ContentLayout>
    </>
  )
}
