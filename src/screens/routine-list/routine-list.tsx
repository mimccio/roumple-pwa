import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { EmptyMainContent } from '&/common/components/empty-main-content'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'

import { MainError, OfflineError } from '../errors'
import { Header } from './header'
import { Item } from './item'
import { EmptyArchived } from './empty-archived'
import { NewRoutineModale } from './new-routine-modale'

export function RoutineList() {
  const { routineList, showStatus, handleShowArchived, archived, onOpenCreate, onCloseCreate, createIsOpen } =
    useRoutineList()

  return (
    <>
      <Header handleShowArchived={handleShowArchived} archived={archived} onOpenNewRoutineModale={onOpenCreate} />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}
        {showStatus.empty && !archived && (
          <EmptyMainContent onClick={onOpenCreate} text="Create a new routine +" image={workflowImg} />
        )}
        {showStatus.empty && archived && <EmptyArchived />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && routineList?.map((routine) => <Item key={routine.id} routine={routine as Routine} />)}
        </MainListLayout>
      </ContentLayout>
      <NewRoutineModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
