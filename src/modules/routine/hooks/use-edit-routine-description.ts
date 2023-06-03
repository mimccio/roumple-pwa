import type { Routine } from '../types'
import { editRoutineDescription } from '../mutations'
import { useMutateRoutine } from './use-mutate-routine'
import { JSONContent } from '@tiptap/react'

export function useEditRoutineDescription(routine: Routine) {
  const { mutate } = useMutateRoutine(editRoutineDescription)
  const submit = (description: JSONContent) => mutate({ ...routine, description })
  return { submit }
}
