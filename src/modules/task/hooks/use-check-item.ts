import { STATUSES } from '@/common/constants'
import type { Task } from '../types'
import { useMutateTaskStatus } from './use-mutate-task-status'

export function useCheckItem(task: Task) {
  const { mutate } = useMutateTaskStatus(task)

  const onCheckItem = (checklistItemId: string) => {
    // Check item
    const index = task.checkedItemIds.findIndex((id: string) => id === checklistItemId)
    let newList: string[] = []
    if (index >= 0) {
      newList = [...task.checkedItemIds.slice(0, index), ...task.checkedItemIds.slice(index + 1)]
    } else {
      newList = [...task.checkedItemIds, checklistItemId]
    }

    // Change status
    let status = task.status
    if (newList.length === task.checklist?.length) {
      status = STATUSES.done
    } else if (newList.length && task.status !== STATUSES.done && index === -1) {
      status = STATUSES.inProgress
    }

    mutate({ ...task, status, checkedItemIds: newList })
  }

  const onRemoveItemId = (checklistItemId: string) => {
    const index = task.checkedItemIds.findIndex((id: string) => id === checklistItemId)
    if (index < 0) return
    mutate({
      ...task,
      checkedItemIds: [...task.checkedItemIds.slice(0, index), ...task.checkedItemIds.slice(index + 1)],
    })
  }

  return { onCheckItem, onRemoveItemId }
}
