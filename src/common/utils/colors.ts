import type { ScheduleType, TwColor } from '../types'
import { SCHEDULE_TYPES, TW_COLOR_TEXT_500 } from '../constants'
import type { TaskScheduleType } from '&/modules/task/types'

export const getPriorityTWTextColor = (priority: number) => {
  if (priority === 1) return 'text-blue-500'
  if (priority === 2) return 'text-orange-500'
  return 'text-gray-400'
}

export const getTWTextColor500 = (color: TwColor) => {
  if (color) return TW_COLOR_TEXT_500[color]
  // return 'text-gray-500'
}
export const getPriorityTWBorderColor = (priority: number) => {
  if (priority === 1) return 'border-blue-500'
  if (priority === 2) return 'border-orange-500'
  return 'border-gray-400'
}

export const getScheduleTypeColor = (type: ScheduleType | TaskScheduleType) => {
  if (type === SCHEDULE_TYPES.daily) return 'text-indigo-500 group-hover:text-indigo-600'
  if (type === SCHEDULE_TYPES.weekly) return 'text-sky-500 group-hover:text-sky-600'
  if (type === SCHEDULE_TYPES.monthly) return 'text-purple-500 group-hover:text-purple-600'
  return 'text-gray-500 group-hover:text-gray-600'
}

export const getScheduleTypeBg = (type: ScheduleType | TaskScheduleType) => {
  if (type === SCHEDULE_TYPES.daily) return 'bg-indigo-500 group-hover:bg-indigo-600'
  if (type === SCHEDULE_TYPES.weekly) return 'bg-sky-500 group-hover:bg-sky-600'
  if (type === SCHEDULE_TYPES.monthly) return 'bg-purple-500 group-hover:bg-purple-600'
  return 'bg-gray-500 group-hover:bg-gray-600'
}
