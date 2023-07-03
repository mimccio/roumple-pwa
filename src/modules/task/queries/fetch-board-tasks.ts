import { format, getDay, lastDayOfWeek, startOfWeek, lastDayOfMonth, getWeek, getMonth } from 'date-fns'

import { db } from '&/db'
import type { ScheduleType } from '&/common/types'
import { DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import type { Task } from '../types'

interface Params {
  queryKey: readonly ['TASK', 'BOARD', { date: Date; type: ScheduleType }]
}

export const fetchBoardTasks = async ({ queryKey }: Params) => {
  const [, , { date, type }] = queryKey

  let query = db
    .from('task')
    .select(
      'id, created_at, name, priority, status, period, scheduleType: schedule_type, description, category(id, name, color)'
    )
    .eq('schedule_type', type)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (type === SCHEDULE_TYPES.daily) {
    query = query.eq('date', format(new Date(date), DATE_FORMAT))
  }

  if (type === SCHEDULE_TYPES.weekly) {
    query = query
      .gte('routine_action.date', format(startOfWeek(date), DATE_FORMAT))
      .lte('routine_action.date', format(lastDayOfWeek(date), DATE_FORMAT))
  }

  // if (type === SCHEDULE_TYPES.monthly) {
  //   const lastDayOfMonthDate = format(lastDayOfMonth(date), DATE_FORMAT)
  //   query = query
  //     .gte('routine_action.date', format(date, 'yyyy-MM-01'))
  //     .lte('routine_action.date', lastDayOfMonthDate)
  //     .contains('monthly_recurrence', [getMonth(date)])
  // }

  const { data, error } = await query

  if (error) throw error

  return data as Task[]
}
