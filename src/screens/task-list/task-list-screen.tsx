import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'

import { useTaskList } from '&/modules/task/hooks'
import { TaskListItem } from '&/modules/task/components'
import { MainError, OfflineError } from '../errors'
import { TaskListHeader } from './parts/task-list-header'

export function TaskListScreen() {
  const { taskList, showStatus, showDone, handleDoneChange } = useTaskList()

  return (
    <>
      <TaskListHeader showDone={showDone} handleDoneChange={handleDoneChange} />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && taskList?.map((task) => <TaskListItem key={task.id} task={task}></TaskListItem>)}
        </MainListLayout>
      </ContentLayout>
    </>
  )
}
