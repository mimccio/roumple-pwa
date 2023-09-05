import { STATUSES } from '&/common/constants'
import { Category } from '&/modules/category/types'
import { Task } from '../types'

export const filterTasks = ({
  showDone,
  category,
  task,
}: {
  showDone: boolean
  category: Category | null
  task: Task
}) => {
  if (showDone) return task.status === STATUSES.done && (category?.id ? task.category?.id === category.id : true)
  if (!showDone) {
    return task.status !== STATUSES.done && (category?.id ? task.category?.id === category.id : true)
  }
}
