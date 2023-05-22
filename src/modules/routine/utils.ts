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

export const getScheduleTypeColor = (type: ScheduleType) => {
  if (type === SCHEDULE_TYPES.daily) return 'text-indigo-700'
  if (type === SCHEDULE_TYPES.weekly) return 'text-sky-700'
  if (type === SCHEDULE_TYPES.monthly) return 'text-purple-700'
}
