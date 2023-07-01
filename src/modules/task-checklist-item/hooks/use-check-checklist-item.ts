import type { Task } from '&/modules/task/types'

import { STATUSES } from '&/common/constants'
import type { Status } from '&/common/types'
import { useMutateTask } from '&/modules/task/hooks'
import type { TaskChecklistItem } from '../types'
import { checkTaskChecklistItem } from '../mutations'

export function useCheckChecklistItem(task: Task) {
  const { mutate } = useMutateTask(checkTaskChecklistItem)

  const onCheck = (checklistItem: TaskChecklistItem) => {
    const itemIndex = task.checklist?.findIndex((item) => item.id === checklistItem.id)

    const newChecklistItem = { ...checklistItem, checked: !checklistItem.checked }

    const newChecklist =
      itemIndex >= 0
        ? [...task.checklist.slice(0, itemIndex), newChecklistItem, ...task.checklist.slice(itemIndex + 1)]
        : task.checklist

    let newStatus: Status = STATUSES.todo

    const doneChecklist = newChecklist.filter((item) => item.checked === true)
    if (doneChecklist.length > 0 && task.status === STATUSES.todo) {
      newStatus = STATUSES.inProgress
    } else if (doneChecklist.length === task.checklist.length && task.status !== STATUSES.done) {
      newStatus = STATUSES.done
    }

    mutate({ ...task, checklist: newChecklist, status: newStatus, newChecklistItem })
  }

  return { onCheck }
}
