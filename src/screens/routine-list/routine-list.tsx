import { Trans, useTranslation } from 'react-i18next'

import locationImg from '&/assets/illustrations/location.png'
import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { EmptyMainContent } from '&/common/components/empty-screens'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'
import { CreateRoutineModale } from '&/modules/routine/components/create-routine-modale'

import { MainError, OfflineError } from '../errors'
import { Header } from './header'
import { Item } from './item'
import { GroupedByScheduleRoutineList } from './grouped-by-schedule-routine-list'

export function RoutineList() {
  const { t } = useTranslation('routine')
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
        {showStatus.empty && !archived && (
          <EmptyMainContent onClick={onOpenCreate} text={t('createNewRoutine')} image={workflowImg} />
        )}
        {showStatus.empty && archived && <EmptyMainContent text={t('noArchivedRoutine')} image={locationImg} />}
        {showStatus.emptyFilteredList && category && (
          <EmptyMainContent
            text={
              <Trans t={t} i18nKey="noRoutineWithCategory" values={{ category: category.name }}>
                No routine with <span className="font-semibold">{category.name}</span> category
              </Trans>
            }
            image={locationImg}
          />
        )}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}

          {showStatus.data && isGroupedBySchedule ? (
            <GroupedByScheduleRoutineList list={routineList} />
          ) : (
            routineList?.map((routine) => <Item key={routine.id} routine={routine as Routine} />)
          )}
        </MainListLayout>
      </ContentLayout>
      <CreateRoutineModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
