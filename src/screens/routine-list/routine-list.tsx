import { useTranslation } from 'react-i18next'
import workflowImg from '&/assets/illustrations/workflow.png'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { EmptyMainContent } from '&/common/components/empty-main-content'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'
import { CreateRoutineModale } from '&/modules/routine/components/create-routine-modale'

import { MainError, OfflineError } from '../errors'
import { Header } from './header'
import { Item } from './item'
import { EmptyArchived } from './empty-archived'

export function RoutineList() {
  const { t } = useTranslation('routine')
  const { routineList, showStatus, handleShowArchived, archived, onOpenCreate, onCloseCreate, createIsOpen } =
    useRoutineList()

  return (
    <>
      <Header handleShowArchived={handleShowArchived} archived={archived} onCreate={onOpenCreate} />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}
        {showStatus.empty && !archived && (
          <EmptyMainContent onClick={onOpenCreate} text={t('createNewRoutine')} image={workflowImg} />
        )}
        {showStatus.empty && archived && <EmptyArchived />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && routineList?.map((routine) => <Item key={routine.id} routine={routine as Routine} />)}
        </MainListLayout>
      </ContentLayout>
      <CreateRoutineModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
