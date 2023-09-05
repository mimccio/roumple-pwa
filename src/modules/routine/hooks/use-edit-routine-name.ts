import type { Routine } from '../types'
import { editRoutineName } from '../mutations'
import { useMutateRoutine } from './use-mutate-routine'

export function useEditRoutineName(routine: Routine) {
  const { mutate } = useMutateRoutine(editRoutineName)
  const submit = (name: string) => mutate({ ...routine, name })
  return { submit }
}
