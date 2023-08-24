import { SCHEDULE_TYPES } from '&/common/constants'
import { ScheduleType } from '&/common/types'
import { Routine } from '&/modules/routine/types'
import { compareAsc, getDay, getMonth, getWeek, startOfMonth, startOfWeek } from 'date-fns'

export const getDailyScheduledRoutines = ({ date, routines }: { date: Date; routines: Routine[] }) =>
  routines
    .filter((r) => compareAsc(date, new Date(r.created_at)) >= 0 && r.daily_recurrence.includes(getDay(date)))
    .sort((a, b) => b.priority - a.priority)

export const getWeeklyScheduledRoutines = ({ date, routines }: { date: Date; routines: Routine[] }) =>
  routines
    .filter(
      (r) =>
        compareAsc(date, startOfWeek(new Date(r.created_at))) >= 0 && r.daily_recurrence.includes(getWeek(date) % 2)
    )
    .sort((a, b) => b.priority - a.priority)

export const getMonthlyScheduledRoutines = ({ date, routines }: { date: Date; routines: Routine[] }) =>
  routines
    .filter(
      (r) =>
        compareAsc(date, startOfMonth(new Date(r.created_at))) >= 0 && r.monthly_recurrence.includes(getMonth(date))
    )
    .sort((a, b) => b.priority - a.priority)

export const getScheduledRoutines = ({
  type,
  date,
  routines,
}: {
  type?: ScheduleType
  date: Date
  routines: Routine[]
}) => {
  if (type === SCHEDULE_TYPES.daily) return getDailyScheduledRoutines({ date, routines })
  if (type === SCHEDULE_TYPES.weekly) return getWeeklyScheduledRoutines({ date, routines })
  if (type === SCHEDULE_TYPES.monthly) return getMonthlyScheduledRoutines({ date, routines })
  return []
}
