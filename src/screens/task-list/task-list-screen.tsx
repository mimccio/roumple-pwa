import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'

import { useTaskList } from '&/modules/task/hooks'
import { MainError, OfflineError } from '../errors'

import { TaskListHeader } from './parts/task-list-header'
import { TaskListItem } from './parts/task-list-item'

export function TaskListScreen() {
  const { taskList, showStatus } = useTaskList()

  return (
    <>
      <TaskListHeader />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {taskList?.map((task) => (
            <TaskListItem key={task.id} task={task}></TaskListItem>
          ))}
        </MainListLayout>
      </ContentLayout>
    </>
  )
}
