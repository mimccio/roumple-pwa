import { addDays, format, getDay } from 'date-fns'

const DATE_FORMAT = 'yyyy-MM-dd'

import { db } from '&/db'
import { Routine, ScheduleType } from '../types'
import { DAILY } from '../constants'

interface Params {
  queryKey: [key: string, boardType: string, options: { date: Date; type: ScheduleType }]
}

export const fetchBoardRoutines = async ({ queryKey }: Params) => {
  const [, , { date, type }] = queryKey

  let query = db
    .from('routine')
    .select(
      'id, name, priority, description, type, period, daily_recurrence, weekly_recurrence, monthly_recurrence, actions:routine_action(id, done, date)'
    )
    .eq('type', type)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (type === DAILY) {
    query = query
      .lte('created_at', format(addDays(date, 1), DATE_FORMAT))
      .contains('daily_recurrence', [getDay(date)])
      .eq('routine_action.date', format(date, DATE_FORMAT))
  }

  const { data, error } = await query
  if (error) throw error

  return data as Routine[]
}
