import type { Status } from '&/common/types'
import type { Task } from '../types'
import { editTaskStatus } from '../mutations'
import { useMutateTask } from './use-mutate-task'
import { useResetChecklistItem } from '&/modules/task-checklist-item/hooks/use-reset-checklist-item'
import { STATUSES } from '&/common/constants'

export function useTaskStatus(task: Task) {
  const { mutate } = useMutateTask(editTaskStatus)
  const { onResetChecklist } = useResetChecklistItem(task)
  const onSelect = (status: Status) => {
    if (status === STATUSES.todo) {
      onResetChecklist()
    }
    mutate({ ...task, status })
  }
  return { onSelect }
}
