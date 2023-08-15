import { format, getDay, lastDayOfWeek, startOfWeek, lastDayOfMonth, getWeek, getMonth } from 'date-fns'

import { db } from '&/db'
import { DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import type { ScheduleType } from '&/common/types'
import type { Routine } from '../types'

interface Params {
  queryKey: readonly ['ROUTINE', 'BOARD', { readonly type: ScheduleType; readonly date: string }]
}

export const fetchBoardRoutines = async ({ queryKey }: Params) => {
  const [, , { date: dateString, type }] = queryKey
  const date = new Date(dateString)

  let query = db
    .from('routine')
    .select(
      'id, name, priority, created_at, archived, type, period, daily_recurrence, weekly_recurrence, monthly_recurrence, occurrence, actions:routine_action(id, status, date, doneOccurrence:done_occurrence), category(id, name, color)'
    )
    .eq('archived', false)
    .eq('type', type)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (type === SCHEDULE_TYPES.daily) {
    query = query.eq('routine_action.date', format(date, DATE_FORMAT)).contains('daily_recurrence', [getDay(date)])
  }

  if (type === SCHEDULE_TYPES.weekly) {
    const lastDayOfWeekDate = format(lastDayOfWeek(date), DATE_FORMAT)
    query = query
      .gte('routine_action.date', format(startOfWeek(date), DATE_FORMAT))
      .lte('routine_action.date', lastDayOfWeekDate)
      .contains('weekly_recurrence', [getWeek(date) % 2])
  }

  if (type === SCHEDULE_TYPES.monthly) {
    const lastDayOfMonthDate = format(lastDayOfMonth(date), DATE_FORMAT)
    query = query
      .gte('routine_action.date', format(date, 'yyyy-MM-01'))
      .lte('routine_action.date', lastDayOfMonthDate)
      .contains('monthly_recurrence', [getMonth(date)])
  }

  const { data, error } = await query

  if (error) throw error

  return data as Routine[]
}
