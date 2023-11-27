import { addMonths, compareAsc, eachMonthOfInterval, startOfYear, subYears } from 'date-fns'

import type { RoutineAction } from '@/modules/routine/types'
import { getMonthSuccessPercentage } from '.'

interface Params {
  count?: number
  occurrence: number
  recurrence: number[]
  actions: RoutineAction[]
  oldest: Date
}

export function getMonthsList({ count = 3, recurrence, actions, occurrence, oldest }: Params) {
  const today = new Date()
  const array = [...Array(count).keys()].reverse()
  let prevSuccessNum: number

  return array.map((i) => {
    const year = startOfYear(subYears(today, i))
    const end = addMonths(year, 11)

    if (compareAsc(end, new Date(oldest)) < 0) {
      return { year, months: [], successNum: 100, prevSuccessNum, isLast: 0 === i, previousCreation: true }
    }

    const months = eachMonthOfInterval({ start: year, end })

    const successNum = getMonthSuccessPercentage({ actions, occurrence, months, recurrence, oldest })
    const boardData = { year, months, successNum, prevSuccessNum, isLast: 0 === i, previousCreation: false }
    prevSuccessNum = successNum

    return boardData
  })
}
