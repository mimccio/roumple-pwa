import { compareAsc, eachDayOfInterval, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import type { RoutineAction } from '&/modules/routine/types'
import { getSuccessPercentage } from './get-success-percentage'

interface Props {
  actions: RoutineAction[]
  count?: number
  occurrence: number
  recurrence: number[]
  scheduleType: ScheduleType
  oldest: Date
}

export const getDaysList = ({ count = 4, actions, occurrence, recurrence, oldest, scheduleType }: Props) => {
  const today = new Date()
  const array = [...Array(count).keys()].reverse()
  let prevSuccessNum: number

  return array.map((i) => {
    const month = subMonths(today, i)
    const end = lastDayOfMonth(month)

    if (compareAsc(end, new Date(oldest)) < 0) {
      return { month, days: [], successNum: 100, prevSuccessNum, isLast: 0 === i, previousCreation: true }
    }

    const days = eachDayOfInterval({ start: startOfMonth(month), end })
    const successNum = getSuccessPercentage({ actions, occurrence, days, recurrence, scheduleType, oldest })
    const boardData = { month, days, successNum, prevSuccessNum, isLast: 0 === i, previousCreation: false }
    prevSuccessNum = successNum
    return boardData
  })
}
