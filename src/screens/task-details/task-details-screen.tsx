import { useTaskDetail } from '&/modules/task/hooks'
import { TaskHeader } from './parts/task-header'
import { TaskDetailsContent } from './task-details-content'

export function TaskDetailsScreen() {
  const { task, isLoading, isPaused } = useTaskDetail()

  return (
    <>
      <TaskHeader task={task} isLoading={isLoading} />
      <TaskDetailsContent task={task} isLoading={isLoading} isPaused={isPaused} />
    </>
  )
}
