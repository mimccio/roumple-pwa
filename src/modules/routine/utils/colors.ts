import { SCHEDULE_TYPES } from '&/common/constants'
import { ScheduleType } from '../types'

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
  if (type === SCHEDULE_TYPES.weekly) return 'text-sky-500 group-hover:text-sky-600'
  if (type === SCHEDULE_TYPES.monthly) return 'text-purple-500 group-hover:text-purple-600'
  return 'text-indigo-500 group-hover:text-indigo-600'
}

export const getScheduleTypeLightColor = (type: ScheduleType) => {
  if (type === SCHEDULE_TYPES.weekly) return 'text-sky-300 group-hover:text-sky-400'
  if (type === SCHEDULE_TYPES.monthly) return 'text-purple-300 group-hover:text-purple-400'
  return 'text-indigo-300 group-hover:text-indigo-400'
}

export const getOccurrenceBg = (type: ScheduleType) => {
  if (type === SCHEDULE_TYPES.weekly) return 'bg-sky-100'
  if (type === SCHEDULE_TYPES.monthly) return 'bg-purple-100'
  return 'bg-indigo-100'
}
