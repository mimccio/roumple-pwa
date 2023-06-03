import { TW_COLOR_TEXT_500 } from '../constants'
import { TwColor } from '../types'

export const getPriorityTWTextColor = (priority: number) => {
  if (priority === 1) return 'text-blue-500'
  if (priority === 2) return 'text-orange-500'
  return 'text-gray-400'
}

export const getTWTextColor500 = (color: TwColor) => {
  if (color) return TW_COLOR_TEXT_500[color]
  // return 'text-gray-500'
}
