import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout, MainListLayout } from '&/common/components/layouts'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'
import { CreateRoutineModale } from '&/modules/routine/components/create-routine-modale'

import { MainError, OfflineError } from '../errors'
import { Header } from './parts/header'
import { Item } from './parts/item'
import { GroupedByScheduleRoutineList } from './parts/grouped-by-schedule-routine-list'
import { EmptyContent } from './parts/empty-content'

export function RoutineList() {
  const {
    archived,
    createIsOpen,
    handleGroupBySchedule,
    handleShowArchived,
    handleSortChange,
    onCloseCreate,
    onOpenCreate,
    routineList,
    showStatus,
    isGroupedBySchedule,
    category,
  } = useRoutineList()

  return (
    <>
      <Header
        archived={archived}
        handleGroupBySchedule={handleGroupBySchedule}
        handleShowArchived={handleShowArchived}
        handleSortChange={handleSortChange}
        onCreate={onOpenCreate}
      />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}

          {showStatus.data && isGroupedBySchedule ? (
            <GroupedByScheduleRoutineList list={routineList} />
          ) : (
            routineList?.map((routine) => <Item key={routine.id} routine={routine as Routine} />)
          )}
        </MainListLayout>

        <EmptyContent showStatus={showStatus} archived={archived} category={category} onOpenCreate={onOpenCreate} />
      </ContentLayout>
      <CreateRoutineModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
