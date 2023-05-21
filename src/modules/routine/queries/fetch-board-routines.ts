import { addDays, format, getDay, lastDayOfWeek, startOfWeek, lastDayOfMonth } from 'date-fns'

const DATE_FORMAT = 'yyyy-MM-dd'

import { db } from '&/db'
import { Routine, ScheduleType } from '../types'
import { SCHEDULE_TYPES } from '../constants'

interface Params {
  queryKey: [key: string, boardType: string, options: { date: Date; type: ScheduleType }]
}

export const fetchBoardRoutines = async ({ queryKey }: Params) => {
  const [, , { date, type }] = queryKey

  let query = db
    .from('routine')
    .select(
      'id, name, priority, description, archived, type, period, daily_recurrence, weekly_recurrence, monthly_recurrence, actions:routine_action(id, done, date)'
    )
    .eq('archived', false)
    .eq('type', type)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (type === SCHEDULE_TYPES.daily) {
    query = query
      .lte('created_at', format(addDays(date, 1), DATE_FORMAT))
      .contains('daily_recurrence', [getDay(date)])
      .eq('routine_action.date', format(date, DATE_FORMAT))
  }

  if (type === SCHEDULE_TYPES.weekly) {
    const lastDayOfWeekDate = format(lastDayOfWeek(date), DATE_FORMAT)
    query = query
      .lte('created_at', lastDayOfWeekDate)
      .gte('routine_action.date', format(startOfWeek(date), DATE_FORMAT))
      .lte('routine_action.date', lastDayOfWeekDate)
  }

  if (type === SCHEDULE_TYPES.monthly) {
    const lastDayOfMonthDate = format(lastDayOfMonth(date), DATE_FORMAT)
    query = query
      .lte('created_at', lastDayOfMonthDate)
      .gte('routine_action.date', format(date, 'yyyy-MM-01'))
      .lte('routine_action.date', lastDayOfMonthDate)
  }

  const { data, error } = await query
  if (error) throw error

  return data as Routine[]
}
