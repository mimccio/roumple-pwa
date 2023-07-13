import { compareAsc, isBefore, startOfMonth, startOfToday, startOfWeek } from 'date-fns'
import { SCHEDULE_TYPES } from '../constants'
import { ScheduleType } from '../types'

export const sortByCreatedAtAsc = (a: { created_at?: Date }, b: { created_at?: Date }) => {
  if (b.created_at && a.created_at) return compareAsc(new Date(b.created_at), new Date(a.created_at))
  return 0
}

const isBeforeToday = (date: Date) => (date ? isBefore(date, startOfToday()) : false)
const isBeforeThisWeek = (date: Date) => (date ? isBefore(date, startOfWeek(startOfToday())) : false)
const isBeforeThisMonth = (date: Date) => (date ? isBefore(date, startOfMonth(startOfToday())) : false)

export const isPassed = ({ date, scheduleType }: { date: Date | null; scheduleType: ScheduleType }) => {
  if (!scheduleType || !date) return false
  if (scheduleType === SCHEDULE_TYPES.daily) return isBeforeToday(date)
  if (scheduleType === SCHEDULE_TYPES.weekly) return isBeforeThisWeek(date)
  if (scheduleType === SCHEDULE_TYPES.monthly) return isBeforeThisMonth(date)
}
