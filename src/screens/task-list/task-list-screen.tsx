import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'

import successImg from '&/assets/illustrations/success.png'
import { useTaskList } from '&/modules/task/hooks'
import { TaskListItem } from '&/modules/task/components'
import { MainError, OfflineError } from '../errors'
import { TaskListHeader } from './parts/task-list-header'
import { EmptyScreen } from '&/common/components/empty-screen'

export function TaskListScreen() {
  const { taskList, showStatus, showDone, handleDoneChange } = useTaskList()

  return (
    <>
      <TaskListHeader showDone={showDone} handleDoneChange={handleDoneChange} />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}
        {showStatus.empty && <EmptyScreen opacity text="No done task" image={successImg} />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && taskList?.map((task) => <TaskListItem key={task.id} task={task}></TaskListItem>)}
        </MainListLayout>
      </ContentLayout>
    </>
  )
}
