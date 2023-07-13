import type { Routine } from '../types'
import { editRoutinePriority } from '../mutations'
import { useMutateRoutine } from './use-mutate-routine'

export function useRoutinePriority(routine: Routine) {
  const { mutate } = useMutateRoutine(editRoutinePriority)

  const onSelect = (priority: number) => mutate({ ...routine, priority })

  return { onSelect }
}
