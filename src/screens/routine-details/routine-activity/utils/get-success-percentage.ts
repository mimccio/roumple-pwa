import { SCHEDULE_TYPES, STATUSES } from '&/common/constants'
import { ScheduleType } from '&/common/types'
import { RoutineAction } from '&/modules/routine/types'
import {
  addDays,
  addMonths,
  compareAsc,
  getDay,
  getMonth,
  getWeek,
  isSameDay,
  isSunday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

// IN_PROGRESS is worth 1/2 DONE - if it doesn't make sense remove and une only DONE occurrences

interface GetScore {
  action?: RoutineAction
  occurrence: number
}

const getScore = ({ action, occurrence }: GetScore) => {
  if (!action) return 0
  const { doneOccurrence, status } = action

  if (doneOccurrence >= occurrence) return 1
  if (status === STATUSES.inProgress || doneOccurrence > 0) {
    const doneScore = (action.doneOccurrence || 0) + (status === STATUSES.inProgress ? 0.5 : 0)
    return doneScore > 0 ? doneScore / occurrence : 0
  }
  return 0
}

interface Props {
  actions: RoutineAction[]
  occurrence: number
  days: Date[]
  recurrence: number[]
  oldest: Date
}

// DAYS
export const getDaySuccessPercentage = ({ days, recurrence, actions, occurrence, oldest }: Props) => {
  let scheduledDays = 0
  let doneDays = 0

  days.forEach((day) => {
    if (compareAsc(addDays(day, 1), new Date(oldest)) > 0 && recurrence.includes(getDay(day)))
      scheduledDays = scheduledDays + 1
    const action = actions.find((action) => isSameDay(day, new Date(action.date)))
    doneDays = doneDays + getScore({ action, occurrence })
  })

  if (doneDays > scheduledDays) doneDays = scheduledDays
  return scheduledDays >= 1 ? Math.round((doneDays / scheduledDays) * 100) : 100
}

// WEEKS
export const getWeekSuccessPercentage = ({ days, recurrence, actions, occurrence, oldest }: Props) => {
  let scheduledWeeks = 0
  let doneWeeks = 0

  days.forEach((day) => {
    if (!isSunday(day)) return
    if (compareAsc(day, new Date(oldest || days[0])) > 0 && recurrence.includes(getWeek(day) % 2))
      scheduledWeeks = scheduledWeeks + 1
    const action = actions.find((action) => isSameDay(startOfWeek(day, { weekStartsOn: 1 }), new Date(action.date)))
    doneWeeks = doneWeeks + getScore({ action, occurrence })
  })

  if (doneWeeks > scheduledWeeks) doneWeeks = scheduledWeeks
  return scheduledWeeks >= 1 ? Math.round((doneWeeks / scheduledWeeks) * 100) : 100
}

interface MonthsParams {
  actions: RoutineAction[]
  occurrence: number
  months: Date[]
  recurrence: number[]
  oldest: Date
}

//MONTHS
export const getMonthSuccessPercentage = ({ months, recurrence, actions, occurrence, oldest }: MonthsParams) => {
  if (!recurrence.length) return 100
  let scheduledMonths = 0
  let doneMonths = 0

  months.forEach((month) => {
    if (compareAsc(addMonths(month, 1), new Date(oldest)) > 0 && recurrence.includes(getMonth(month))) {
      scheduledMonths = scheduledMonths + 1
    }
    const action = actions.find((action) => isSameDay(startOfMonth(month), new Date(action.date)))
    doneMonths = doneMonths + getScore({ action, occurrence })
  })

  if (doneMonths > scheduledMonths) doneMonths = scheduledMonths
  return scheduledMonths >= 1 ? Math.round((doneMonths / scheduledMonths) * 100) : 100
}

// DAYS & WEEKS
export const getSuccessPercentage = ({
  actions,
  days,
  occurrence,
  recurrence,
  scheduleType,
  oldest,
}: Props & { scheduleType: ScheduleType }) => {
  if (!recurrence.length) return 100
  if (scheduleType === SCHEDULE_TYPES.daily)
    return getDaySuccessPercentage({ actions, occurrence, days, recurrence, oldest })
  if (scheduleType === SCHEDULE_TYPES.weekly)
    return getWeekSuccessPercentage({ actions, occurrence, days, recurrence, oldest })
  return 0
}
