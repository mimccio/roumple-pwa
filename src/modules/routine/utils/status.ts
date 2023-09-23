import { STATUSES } from '&/common/constants'
import { Routine, RoutineAction } from '../types'

export const getRoutineIsDone = ({ routine, action: routineAction }: { routine: Routine; action?: RoutineAction }) => {
  const action = routineAction || { status: STATUSES.todo, doneOccurrence: 0 }
  return action.status === STATUSES.done || action.doneOccurrence >= routine.occurrence
}
