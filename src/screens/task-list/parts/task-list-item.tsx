import { Task } from '&/modules/task/types'

interface Props {
  task: Task
}

export function TaskListItem({ task }: Props) {
  return <div>{task.name}</div>
}
