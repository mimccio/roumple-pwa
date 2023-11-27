import type { Status } from '@/common/types'
import { STATUSES } from '@/common/constants'
import type { Task } from '../types'
import { useMutateTaskStatus } from './use-mutate-task-status'

export function useTaskStatus(task: Task) {
  const { mutate } = useMutateTaskStatus(task)

  let checkedItemIds = task.checkedItemIds
  const onSelect = (status: Status) => {
    if (status === STATUSES.todo) {
      checkedItemIds = []
    }
    mutate({ ...task, status, checkedItemIds })
  }

  return { onSelect }
}
