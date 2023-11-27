import { ContentLayout } from '@/common/components/layouts'

import { useTaskList } from '@/modules/task/hooks'
import { CreateTaskModale } from '@/modules/task/components'
import { TaskListHeader } from './parts/task-list-header'
import { TaskListContent } from './parts/task-list-content'
import { TasksFallback } from './parts/tasks-fallback'

export function TaskListScreen() {
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
        {showStatus.data ? (
          <TaskListContent list={taskList} showDone={showDone} />
        ) : (
          <TasksFallback showStatus={showStatus} showDone={showDone} onOpenCreate={onOpenCreate} category={category} />
        )}
      </ContentLayout>
      <CreateTaskModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
