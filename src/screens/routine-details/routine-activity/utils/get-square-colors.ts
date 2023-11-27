import { isToday } from 'date-fns'
import { STATUSES } from '@/common/constants'
import { cl } from '@/common/utils'
import type { RoutineAction } from '@/modules/routine/types'

interface Params {
  action?: RoutineAction
  day: Date
  isFuture: boolean
  occurrence: number
  isScheduled: boolean
  isThisMonth?: boolean
}

export const getSquareColors = ({ action, day, occurrence, isFuture, isScheduled, isThisMonth }: Params) => {
  const doneOccurrence = action?.doneOccurrence || 0

  let bg = 'bg-white text-gray-400'
  let border = 'border-gray-200'

  if (isScheduled) {
    bg = 'bg-orange-100 text-orange-600'
    border = 'border-orange-200 '
  }
  if (isFuture) {
    border = 'border-gray-200'
    bg = isScheduled ? 'bg-gray-100' : 'bg-white'
  }
  if (doneOccurrence > 0 || action?.status === STATUSES.inProgress) {
    bg = 'bg-blue-400 text-white'
    border = 'border-blue-400'
  }
  if (doneOccurrence === occurrence) {
    bg = 'bg-green-400 text-white'
    border = 'border-green-400'
  }
  if (isToday(day)) border = 'border-2 border-indigo-500 shadow-md shadow-indigo-100'
  if (isThisMonth) border = 'border-4 border-purple-500 shadow-lg shadow-purple-200'

  return cl(bg, border)
}
