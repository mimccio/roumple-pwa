import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout } from '&/common/components/layouts/content-layout'
import { EmptyMainContent } from '&/common/components/empty-main-content'
import { useCreateRoutine, useRoutineList } from '&/modules/routine/hooks'
import { Header } from './header'
import { Item } from './item'
import { EmptyArchived } from './empty-archived'

export function RoutineList() {
  const { routines, isLoading, handleShowArchived, archived } = useRoutineList()
  const { onCreateRoutine } = useCreateRoutine()

  return (
    <>
      <Header handleShowArchived={handleShowArchived} archived={archived} />
      <ContentLayout>
        {!isLoading && !routines?.length && !archived && (
          <EmptyMainContent onClick={onCreateRoutine} text="Create a new routine +" image={workflowImg} />
        )}
        {!isLoading && !routines?.length && archived && <EmptyArchived />}
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
