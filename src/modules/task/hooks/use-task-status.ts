import type { Status } from '&/common/types'
import type { Task } from '../types'
import { editTaskStatus } from '../mutations'
import { useMutateTask } from './use-mutate-task'

export function useTaskStatus(task: Task) {
  const { mutate } = useMutateTask(editTaskStatus)
  const onSelect = (status: Status) => mutate({ ...task, status })
  return { onSelect }
}
