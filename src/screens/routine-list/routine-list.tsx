import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout } from '&/common/components/layouts/content-layout'
import { EmptyMainContent } from '&/common/components/empty-main-content'
import { useCreateRoutine, useRoutineList } from '&/modules/routine/hooks'
import { Header } from './header'
import { Item } from './item'
import { EmptyArchived } from './empty-archived'
import { MainError, MainOfflineEmpty } from '../errors'
import { Routine } from '&/modules/routine/types'
import NewRoutineModale from './new-routine-modale/new-routine-modale'
import { useState } from 'react'

export function RoutineList() {
  const { routines, isLoading, handleShowArchived, archived, isEmpty, isError, isOfflineEmpty } = useRoutineList()
  const { onCreateRoutine } = useCreateRoutine()

  const [newRoutineModaleIsOpen, setNewRoutineModaleIsOpen] = useState(false)

  const toggle = (value: boolean) => setNewRoutineModaleIsOpen(value)

  return (
    <>
      <Header handleShowArchived={handleShowArchived} archived={archived} onOpenNewRoutineModale={() => toggle(true)} />
      <ContentLayout>
        {isError && <MainError />}
        {isEmpty && !archived && (
          <EmptyMainContent onClick={onCreateRoutine} text="Create a new routine +" image={workflowImg} />
        )}
        {isEmpty && archived && <EmptyArchived />}
        {isOfflineEmpty && <MainOfflineEmpty />}

        <div className="flex flex-col gap-4 px-2 xl:px-4">
          {isLoading && <ListSkeleton />}
          {routines?.map((routine) => (
            <Item key={routine.id} routine={routine as Routine} />
          ))}
        </div>
        <NewRoutineModale isOpen={newRoutineModaleIsOpen} close={() => toggle(false)} />
      </ContentLayout>
    </>
  )
}
