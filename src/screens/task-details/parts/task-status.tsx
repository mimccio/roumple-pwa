import { STATUSES } from '@/common/constants'
import { cl, getPriorityFromColor, getPriorityToColor } from '@/common/utils'

import type { Task } from '@/modules/task/types'
import { useTaskStatus } from '@/modules/task/hooks'
import { TaskStatusSelector } from '@/modules/task/components'
import { TaskPriority } from './task-priority'

interface Props {
  task: Task
}

export function TaskStatus({ task }: Props) {
  const { onSelect } = useTaskStatus(task)

  const getBg = () => {
    if (task.status === STATUSES.done) return `bg-gradient-to-r to-green-100 from-green-50`
    const fromColor = getPriorityFromColor(task.priority)
    if (task.status === STATUSES.inProgress) return `bg-gradient-to-r to-green-100 ${fromColor}`
    return `bg-gradient-to-r ${getPriorityToColor(task.priority)} ${fromColor}`
  }

  return (
    <div
      className={cl(
        'flex h-16 items-center justify-center gap-x-4 border-b border-gray-200  transition-colors',
        getBg()
      )}
    >
      <TaskStatusSelector status={task.status} onSelect={onSelect} />
      <span className="absolute right-2">
        <TaskPriority task={task} />
      </span>
    </div>
  )
}
