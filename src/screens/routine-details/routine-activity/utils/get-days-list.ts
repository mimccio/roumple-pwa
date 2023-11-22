import { eachDayOfInterval, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import type { RoutineAction } from '&/modules/routine/types'
import { getSuccessPercentage } from './get-success-percentage'

interface Props {
  actions: RoutineAction[]
  count?: number
  occurrence: number
  recurrence: number[]
  scheduleType: ScheduleType
}

export const getDaysList = ({ count = 4, actions, occurrence, recurrence, scheduleType }: Props) => {
  const today = new Date()
  const array = [...Array(count).keys()].reverse()
  let prevSuccessNum: number

  return array.map((i) => {
    const month = subMonths(today, i)
    const days = eachDayOfInterval({ start: startOfMonth(month), end: lastDayOfMonth(month) })
    const successNum = getSuccessPercentage({ actions, occurrence, days, recurrence, scheduleType })
    const boardData = { month, days, successNum, prevSuccessNum, isLast: 0 === i }
    prevSuccessNum = successNum
    return boardData
  })
}
