import type { Status } from '&/common/types'
import { STATUSES } from '&/common/constants'
import type { Task } from '../types'
import { editTaskStatus } from '../mutations'
import { useMutateTask } from './use-mutate-task'

export function useTaskStatus(task: Task) {
  const { mutate } = useMutateTask(editTaskStatus)

  let checkedItemIds = task.checkedItemIds
  const onSelect = (status: Status) => {
    if (status === STATUSES.todo) {
      checkedItemIds = []
    }
    mutate({ ...task, status, checkedItemIds })
  }

  return { onSelect }
}
