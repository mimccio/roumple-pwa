import type { Task } from '../types'
import { editTaskName } from '../mutations'
import { useMutateTask } from '.'

export function useEditTaskName(task: Task) {
  const { mutate } = useMutateTask(editTaskName)

  const submit = (name: string) => {
    if (!name.length) return
    mutate({ ...task, name })
  }
  return { submit }
}
