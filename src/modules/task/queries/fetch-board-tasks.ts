import { format, lastDayOfWeek, lastDayOfMonth } from 'date-fns'

import { db } from '&/db'
import { DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import type { Task, TaskScheduleType } from '../types'

interface Params {
  queryKey: readonly ['TASK', 'BOARD', { date: string; type: TaskScheduleType }]
}

export const fetchBoardTasks = async ({ queryKey }: Params) => {
  const [, , { date: dateString, type }] = queryKey

  let query = db
    .from('task')
    .select(
      'id, created_at, name, priority, status, date, period, scheduleType: schedule_type, description, category(id, name, color)'
    )
    .eq('schedule_type', type)
    .order('date', { ascending: true })
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (type === SCHEDULE_TYPES.daily) {
    query = query.lte('date', dateString)
  }

  if (type === SCHEDULE_TYPES.weekly) {
    const date = new Date(dateString)
    query = query.lte('date', format(lastDayOfWeek(date), DATE_FORMAT))
  }

  if (type === SCHEDULE_TYPES.monthly) {
    const date = new Date(dateString)
    query = query.lte('date', format(lastDayOfMonth(date), DATE_FORMAT))
  }

  const { data, error } = await query

  if (error) throw error

  return data as Task[]
}
