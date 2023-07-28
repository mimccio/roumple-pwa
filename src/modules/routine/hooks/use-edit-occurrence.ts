import { ChangeEvent, useState } from 'react'
import type { Routine } from '../types'
import { editRoutineOccurrence } from '../mutations'
import { useMutateRoutine } from './use-mutate-routine'

export function useEditOccurrence(routine: Routine) {
  const { mutate } = useMutateRoutine(editRoutineOccurrence)
  const [occurrence, setOccurrence] = useState(routine.occurrence)

  const submit = () => mutate({ ...routine, occurrence })

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value)
    let occurrence = value
    if (value >= 10) occurrence = 10
    setOccurrence(occurrence)
  }
  const add = () => {
    if (occurrence >= 10) return
    setOccurrence(occurrence + 1)
  }
  const sub = () => {
    if (occurrence <= 1) return
    setOccurrence(occurrence - 1)
  }

  const onBlur = () => {
    if (occurrence < 1) setOccurrence(1)
  }

  const reset = () => setOccurrence(routine.occurrence)

  return { submit, add, sub, onChange, onBlur, occurrence, reset }
}
