import { getDay, getMonth, getWeek } from 'date-fns'

import { SCHEDULE_TYPES } from '&/common/constants'
import type { Routine } from '../types'

export const getIsScheduled = ({ routine, date }: { routine: Routine; date: Date }) => {
  if (routine.type === SCHEDULE_TYPES.daily) return routine.daily_recurrence.includes(getDay(date))
  if (routine.type === SCHEDULE_TYPES.weekly) return routine.weekly_recurrence.includes(getWeek(date) % 2)
  if (routine.type === SCHEDULE_TYPES.monthly) return routine.monthly_recurrence.includes(getMonth(date))
}
