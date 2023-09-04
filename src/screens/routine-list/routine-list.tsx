import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout, MainListLayout } from '&/common/components/layouts'

import { useRoutineList } from '&/modules/routine/hooks'
import { CreateRoutineModale } from '&/modules/routine/components/create-routine-modale'

import { MainError, OfflineError } from '../errors'
import { Header } from './parts/header'
import { GroupedByScheduleRoutineList } from './parts/grouped-by-schedule-routine-list'
import { EmptyContent } from './parts/empty-content'
import { SimpleList } from './parts/simple-list'

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
            <GroupedByScheduleRoutineList list={routineList} archived={archived} />
          ) : (
            <SimpleList routineList={routineList} archived={archived} />
          )}
        </MainListLayout>

        <EmptyContent showStatus={showStatus} archived={archived} category={category} onOpenCreate={onOpenCreate} />
      </ContentLayout>
      <CreateRoutineModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
