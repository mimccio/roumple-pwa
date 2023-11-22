import { eachDayOfInterval, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns'

import type { RoutineAction } from '&/modules/routine/types'
import { getSuccessPercentage } from './get-success-percentage'

interface Props {
  count?: number
  actions: RoutineAction[]
  occurrence: number
  recurrence: number[]
}

export const getDaysList = ({ count = 4, actions, occurrence, recurrence }: Props) => {
  const today = new Date()
  const array = [...Array(count).keys()].reverse()
  let prevSuccessNum: number
  const daysList = array.map((i) => {
    const month = subMonths(today, i)
    const days = eachDayOfInterval({
      start: startOfMonth(month),
      end: lastDayOfMonth(month),
    })
    const successNum = getSuccessPercentage({ actions, occurrence, days, recurrence })

    const boardData = { month, days, successNum, prevSuccessNum, isLast: 0 === i }
    prevSuccessNum = successNum
    return boardData
  })
  return daysList
}
