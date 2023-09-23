import type { Task } from '&/modules/task/types'
import { useTaskStatus } from '&/modules/task/hooks'
import { TaskStatusSelector } from '&/modules/task/components'

interface Props {
  task: Task
}

export function TaskStatus({ task }: Props) {
  const { onSelect } = useTaskStatus(task)
  return <TaskStatusSelector status={task.status} onSelect={onSelect} />
}
