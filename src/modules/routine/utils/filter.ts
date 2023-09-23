import type { Category } from '../../category/types'
import { Routine } from '../types'
import { getRoutineIsDone } from './status'

export const filterRoutines = ({
  showDone,
  category,
  routine,
}: {
  showDone: boolean
  category: Category | null
  routine: Routine
}) => {
  const isDone = getRoutineIsDone({ routine, action: routine.actions?.[0] })
  if (showDone) return isDone && (category?.id ? routine.category?.id === category.id : true)
  if (!showDone) {
    return !isDone && (category?.id ? routine.category?.id === category.id : true)
  }
}
