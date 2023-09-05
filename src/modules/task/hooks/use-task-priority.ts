import type { Task } from '../types'
import { editTaskPriority } from '../mutations'
import { useMutateTask } from './use-mutate-task'

export function useTaskPriority(task: Task) {
  const { mutate } = useMutateTask(editTaskPriority)
  const onSelect = (priority: number) => mutate({ ...task, priority })
  return { onSelect }
}
