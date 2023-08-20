import { useTranslation } from 'react-i18next'
import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { EmptyScreen } from '&/common/components/empty-screen'
import { EmptyMainContent } from '&/common/components/empty-main-content'
import workflowImg from '&/assets/illustrations/workflow.png'
import successImg from '&/assets/illustrations/success.png'

import { useTaskList } from '&/modules/task/hooks'
import { CreateTaskModale, TaskListItem } from '&/modules/task/components'
import { MainError, OfflineError } from '../errors'
import { TaskListHeader } from './parts/task-list-header'

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
        {showStatus.empty && showDone && <EmptyScreen opacity text={t('noDoneTask')} image={successImg} />}
        {showStatus.empty && !showDone && (
          <EmptyMainContent onClick={onOpenCreate} text={t('createNewTask')} image={workflowImg} />
        )}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && taskList?.map((task) => <TaskListItem key={task.id} task={task}></TaskListItem>)}
        </MainListLayout>
      </ContentLayout>
      <CreateTaskModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
