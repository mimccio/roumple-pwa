import { getDay, getMonth, getWeek } from 'date-fns'

import { SCHEDULE_TYPES } from './constants'
import { Routine, ScheduleType } from './types'

export const sortRoutines = (a: Routine, b: Routine) => {
  if (a.priority === b.priority) {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  } else {
    return b.priority - a.priority
  }
}

export const getPeriodText = ({ type, period }: { type: ScheduleType; period: number }) => {
  if (type === SCHEDULE_TYPES.daily) {
    if (period === 1) return 'In the morning'
    if (period === 2) return 'During lunch time'
    if (period === 3 || period === 0) return 'During the day'
    if (period === 4) return 'In the evening'
  }

  if (type === SCHEDULE_TYPES.weekly) {
    if (period === 1 || period === 0) return 'During the week'
    if (period === 2) return 'In the weekend'
  }

  if (type === SCHEDULE_TYPES.monthly) {
    if (period === 1) return 'At the start of the month'
    if (period === 2 || period === 0) return 'During the month'
    if (period === 3) return 'At the end of the month'
  }
}

export const getPeriodColor = (type: ScheduleType) => {
  if (type === SCHEDULE_TYPES.weekly) return 'text-sky-500'
  if (type === SCHEDULE_TYPES.monthly) return 'text-purple-500'
  return 'text-indigo-500'
}

export const getGroupHoverPeriodColor = (type: ScheduleType) => {
  if (type === SCHEDULE_TYPES.weekly) return 'group-hover:text-sky-400'
  if (type === SCHEDULE_TYPES.monthly) return 'group-hover:text-purple-400'
  return 'group-hover:text-indigo-400'
}

export const getScheduleTypeColor = (type: ScheduleType) => {
  if (type === SCHEDULE_TYPES.daily) return 'text-indigo-700'
  if (type === SCHEDULE_TYPES.weekly) return 'text-sky-700'
  if (type === SCHEDULE_TYPES.monthly) return 'text-purple-700'
}

export const getIsScheduled = ({ data, date }: { data: Routine; date: number }) => {
  if (data.type === SCHEDULE_TYPES.daily) return data.daily_recurrence.includes(getDay(date))
  if (data.type === SCHEDULE_TYPES.weekly) return data.weekly_recurrence.includes(getWeek(date) % 2)
  if (data.type === SCHEDULE_TYPES.monthly) return data.monthly_recurrence.includes(getMonth(date))
}
