import { StatusSelector } from '&/common/components/inputs/status-selector'
import type { Task } from '&/modules/task/types'
import { useTaskStatus } from '&/modules/task/hooks'

interface Props {
  task: Task
}

export function TaskStatus({ task }: Props) {
  const { onSelect } = useTaskStatus(task)
  return <StatusSelector status={task.status} onSelect={onSelect} />
}
