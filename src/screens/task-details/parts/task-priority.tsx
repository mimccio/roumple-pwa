import { PrioritySelector } from '&/common/components/inputs/priority-selector'
import type { Task } from '&/modules/task/types'
import { useTaskPriority } from '&/modules/task/hooks'

interface Props {
  task: Task
}

export function TaskPriority({ task }: Props) {
  const { onSelect } = useTaskPriority(task)

  return (
    <div>
      <PrioritySelector priority={task.priority} onSelect={onSelect} />
    </div>
  )
}
