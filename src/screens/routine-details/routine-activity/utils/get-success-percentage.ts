import { STATUSES } from '&/common/constants'
import { RoutineAction } from '&/modules/routine/types'
import { getDay, isSameDay } from 'date-fns'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  days: Date[]
  recurrence: number[]
}

// DAY
export const getSuccessPercentage = ({ days, recurrence, actions, occurrence }: Props) => {
  if (!recurrence.length) return 100

  let scheduledDays = 0

  let doneDays = 0

  days.forEach((day) => {
    if (recurrence.includes(getDay(day))) scheduledDays = scheduledDays + 1
    const action = actions.find((action) => isSameDay(day, new Date(action.date)))
    if (action?.doneOccurrence && action.doneOccurrence >= occurrence) {
      doneDays = doneDays + 1
    } else if (action?.status === STATUSES.inProgress || (action?.doneOccurrence && action.doneOccurrence > 0)) {
      const doneScore = (action.doneOccurrence || 0) + (action?.status === STATUSES.inProgress ? 0.5 : 0)
      doneDays = doneDays + (doneScore > 0 ? doneScore / occurrence : 0)
    }
  })

  return scheduledDays >= 1 ? Math.round((doneDays / scheduledDays) * 100) : 100
}
