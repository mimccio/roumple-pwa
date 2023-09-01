import { Trans, useTranslation } from 'react-i18next'

import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { EmptyMainContent } from '&/common/components/empty-screens'
import workflowImg from '&/assets/illustrations/workflow.png'
import successImg from '&/assets/illustrations/success.png'
import locationImg from '&/assets/illustrations/location.png'

import { useTaskList } from '&/modules/task/hooks'
import { CreateTaskModale } from '&/modules/task/components'
import { MainError, OfflineError } from '../errors'
import { TaskListHeader } from './parts/task-list-header'
import { TaskListContent } from './parts/task-list-content'

export function TaskListScreen() {
  const { t } = useTranslation('task')
  const {
    createIsOpen,
    handleDoneChange,
    handleSortChange,
    onCloseCreate,
    onOpenCreate,
    showDone,
    showStatus,
    taskList,
    category,
  } = useTaskList()

  return (
    <>
      <TaskListHeader
        showDone={showDone}
        handleDoneChange={handleDoneChange}
        handleSortChange={handleSortChange}
        onCreate={onOpenCreate}
      />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && showDone && <TaskListContent list={taskList} />}
          {showStatus.data && !showDone && <TaskListContent list={taskList} />}
        </MainListLayout>

        {showStatus.empty && !showDone && (
          <EmptyMainContent onClick={onOpenCreate} text={t('createNewTask')} image={workflowImg} />
        )}
        {showStatus.empty && showDone && <EmptyMainContent text={t('noDoneTask')} image={successImg} />}
        {showStatus.emptyFilteredList && category && (
          <EmptyMainContent
            text={
              <Trans t={t} i18nKey="noTaskWithCategory" values={{ category: category.name }}>
                No task with <span className="font-semibold">{category.name}</span> category
              </Trans>
            }
            image={locationImg}
          />
        )}
      </ContentLayout>
      <CreateTaskModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
