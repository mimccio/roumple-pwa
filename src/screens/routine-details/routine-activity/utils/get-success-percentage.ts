import { SCHEDULE_TYPES, STATUSES } from '&/common/constants'
import { ScheduleType } from '&/common/types'
import { RoutineAction } from '&/modules/routine/types'
import { addDays, compareAsc, getDay, getWeek, isSameDay, isSunday, startOfWeek } from 'date-fns'

// IN_PROGRESS is worth 1/2 DONE - if it doesn't make sense remove and une only DONE occurrences

interface Props {
  actions: RoutineAction[]
  occurrence: number
  days: Date[]
  recurrence: number[]
  oldest: Date
}

// DAYS
export const getDaySuccessPercentage = ({ days, recurrence, actions, occurrence, oldest }: Props) => {
  if (!recurrence.length) return 100
  let scheduledDays = 0
  let doneDays = 0

  days.forEach((day) => {
    if (compareAsc(addDays(day, 1), new Date(oldest)) > 0 && recurrence.includes(getDay(day)))
      scheduledDays = scheduledDays + 1
    const action = actions.find((action) => isSameDay(day, new Date(action.date)))
    if (action?.doneOccurrence && action.doneOccurrence >= occurrence) {
      doneDays = doneDays + 1
    } else if (action?.status === STATUSES.inProgress || (action?.doneOccurrence && action.doneOccurrence > 0)) {
      const doneScore = (action.doneOccurrence || 0) + (action?.status === STATUSES.inProgress ? 0.5 : 0)
      doneDays = doneDays + (doneScore > 0 ? doneScore / occurrence : 0)
    }
  })

  if (doneDays > scheduledDays) doneDays = scheduledDays

  return scheduledDays >= 1 ? Math.round((doneDays / scheduledDays) * 100) : 100
}

// WEEKS
export const getWeekSuccessPercentage = ({ days, recurrence, actions, occurrence, oldest }: Props) => {
  if (!recurrence.length) return 100
  let scheduledWeeks = 0
  let doneWeeks = 0

  days.forEach((day) => {
    if (!isSunday(day)) return
    if (compareAsc(day, new Date(oldest || days[0])) > 0 && recurrence.includes(getWeek(day) % 2))
      scheduledWeeks = scheduledWeeks + 1

    const action = actions.find((action) => isSameDay(startOfWeek(day, { weekStartsOn: 1 }), new Date(action.date)))

    if (action?.doneOccurrence && action.doneOccurrence >= occurrence) {
      doneWeeks = doneWeeks + 1
    } else if (action?.status === STATUSES.inProgress || (action?.doneOccurrence && action.doneOccurrence > 0)) {
      const doneScore = (action.doneOccurrence || 0) + (action?.status === STATUSES.inProgress ? 0.5 : 0)
      doneWeeks = doneWeeks + (doneScore > 0 ? doneScore / occurrence : 0)
    }
  })

  if (doneWeeks > scheduledWeeks) doneWeeks = scheduledWeeks
  return scheduledWeeks >= 1 ? Math.round((doneWeeks / scheduledWeeks) * 100) : 100
}

// ALL
export const getSuccessPercentage = ({
  actions,
  days,
  occurrence,
  recurrence,
  scheduleType,
  oldest,
}: Props & { scheduleType: ScheduleType }) => {
  if (scheduleType === SCHEDULE_TYPES.daily)
    return getDaySuccessPercentage({ actions, occurrence, days, recurrence, oldest })
  if (scheduleType === SCHEDULE_TYPES.weekly)
    return getWeekSuccessPercentage({ actions, occurrence, days, recurrence, oldest })
  return 0
}
