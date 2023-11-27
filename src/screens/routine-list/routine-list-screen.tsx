import { ContentLayout } from '@/common/components/layouts'

import { useRoutineList } from '@/modules/routine/hooks'
import { CreateRoutineModale } from '@/modules/routine/components/create-routine-modale'

import { Header } from './parts/header'
import { RoutinesFallback } from './parts/routines-fallback'
import { RoutineList } from './parts/routine-list'

export function RoutineListScreen() {
  const {
    archived,
    category,
    createIsOpen,
    handleGroupBySchedule,
    handleShowArchived,
    handleSortChange,
    isGroupedBySchedule,
    onCloseCreate,
    onOpenCreate,
    routineList,
    showStatus,
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
        {showStatus.data ? (
          <RoutineList routineList={routineList} isGroupedBySchedule={isGroupedBySchedule} archived={archived} />
        ) : (
          <RoutinesFallback
            showStatus={showStatus}
            archived={archived}
            category={category}
            onOpenCreate={onOpenCreate}
          />
        )}
      </ContentLayout>
      <CreateRoutineModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
