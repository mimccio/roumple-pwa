import { useState } from 'react'

import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout } from '&/common/components/layouts/content-layout'
import { EmptyMainContent } from '&/common/components/empty-main-content'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'

import { MainError, MainOfflineEmpty } from '../errors'
import { Header } from './header'
import { Item } from './item'
import { EmptyArchived } from './empty-archived'
import NewRoutineModale from './new-routine-modale/new-routine-modale'

export function RoutineList() {
  const { routines, isLoading, handleShowArchived, archived, isEmpty, isError, isOfflineEmpty } = useRoutineList()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Header
        handleShowArchived={handleShowArchived}
        archived={archived}
        onOpenNewRoutineModale={() => setIsOpen(true)}
      />
      <ContentLayout>
        {isError && <MainError />}
        {isEmpty && !archived && (
          <EmptyMainContent onClick={() => setIsOpen(true)} text="Create a new routine +" image={workflowImg} />
        )}
        {isEmpty && archived && <EmptyArchived />}
        {isOfflineEmpty && <MainOfflineEmpty />}

        <div className="flex flex-col gap-4 px-2 xl:px-4">
          {isLoading && <ListSkeleton />}
          {routines?.map((routine) => (
            <Item key={routine.id} routine={routine as Routine} />
          ))}
        </div>
        <NewRoutineModale isOpen={isOpen} close={() => setIsOpen(false)} />
      </ContentLayout>
    </>
  )
}
