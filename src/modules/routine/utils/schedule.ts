import {
  format,
  getDay,
  getMonth,
  getWeek,
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import type { ScheduleType } from '&/common/types'
import { DATE_FORMAT, MONTH_DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import type { Routine } from '../types'

export const getIsScheduled = ({ routine, date }: { routine: Routine; date: Date }) => {
  if (routine.scheduleType === SCHEDULE_TYPES.daily) return routine.daily_recurrence.includes(getDay(date))
  if (routine.scheduleType === SCHEDULE_TYPES.weekly) return routine.weekly_recurrence.includes(getWeek(date) % 2)
  if (routine.scheduleType === SCHEDULE_TYPES.monthly) return routine.monthly_recurrence.includes(getMonth(date))
}

export const getIsCurrentDate = ({ scheduleType, date }: { scheduleType: ScheduleType; date: Date }) => {
  if (scheduleType === SCHEDULE_TYPES.daily && isSameDay(date, startOfToday())) return true
  if (
    scheduleType === SCHEDULE_TYPES.weekly &&
    isSameWeek(date, startOfToday(), {
      weekStartsOn: 1,
    })
  )
    return true
  if (scheduleType === SCHEDULE_TYPES.monthly && isSameMonth(date, startOfToday())) return true
}

export const getScheduleFormattedDate = ({ scheduleType, date }: { scheduleType?: ScheduleType; date: Date }) => {
  if (scheduleType === SCHEDULE_TYPES.weekly) return format(startOfWeek(date, { weekStartsOn: 1 }), DATE_FORMAT)
  if (scheduleType === SCHEDULE_TYPES.monthly) return format(date, MONTH_DATE_FORMAT)
  return format(date, DATE_FORMAT)
}
