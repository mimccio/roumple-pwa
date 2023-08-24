import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'

export const getPeriodColor = (scheduleType: ScheduleType) => {
  if (scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-500'
  if (scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-500'
  return 'text-indigo-500'
}

export const getGroupHoverPeriodColor = (scheduleType: ScheduleType) => {
  if (scheduleType === SCHEDULE_TYPES.weekly) return 'group-hover:text-sky-400'
  if (scheduleType === SCHEDULE_TYPES.monthly) return 'group-hover:text-purple-400'
  return 'group-hover:text-indigo-400'
}

export const getScheduleTypeColor = (scheduleType: ScheduleType) => {
  if (scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-500 group-hover:text-sky-600'
  if (scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-500 group-hover:text-purple-600'
  return 'text-indigo-500 group-hover:text-indigo-600'
}

export const getScheduleTypeLightColor = (scheduleType: ScheduleType) => {
  if (scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-300 group-hover:text-sky-400'
  if (scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-300 group-hover:text-purple-400'
  return 'text-indigo-300 group-hover:text-indigo-400'
}

export const getOccurrenceBg = (scheduleType: ScheduleType) => {
  if (scheduleType === SCHEDULE_TYPES.weekly) return 'bg-sky-100'
  if (scheduleType === SCHEDULE_TYPES.monthly) return 'bg-purple-100'
  return 'bg-indigo-100'
}
