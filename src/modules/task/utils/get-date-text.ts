import {
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  isSameMonth,
  isSameWeek,
  isThisMonth,
  isThisWeek,
  isToday,
  isTomorrow,
  startOfToday,
  startOfWeek,
} from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'

export const getDayDateText = (date: Date) => {
  if (isToday(date)) return 'today'
  if (isTomorrow(date)) return 'tomorrow'
  return format(date, 'dd MMM yy')
}

export const getWeekDateText = (date: Date) => {
  if (isThisWeek(date)) return 'this week'
  if (isSameWeek(date, addWeeks(startOfToday(), 1))) return 'next week'
  const start = format(startOfWeek(date), 'dd MMM')
  const end = format(endOfWeek(date), 'dd MMM yy')
  return `${start} - ${end}`
}

export const getMonthDateText = (date: Date) => {
  if (isThisMonth(date)) return 'this month'
  if (isSameMonth(date, addMonths(startOfToday(), 1))) return 'next month'
  return format(date, 'MMMM yyyy')
}

export const getDateText = ({ date, scheduleType }: { date: Date | null; scheduleType: ScheduleType }) => {
  if (!date) return 'No schedule'
  const dateToFormat = new Date(date)
  if (scheduleType === SCHEDULE_TYPES.daily) return getDayDateText(dateToFormat)
  if (scheduleType === SCHEDULE_TYPES.weekly) return getWeekDateText(dateToFormat)
  if (scheduleType === SCHEDULE_TYPES.monthly) return getMonthDateText(dateToFormat)
}
