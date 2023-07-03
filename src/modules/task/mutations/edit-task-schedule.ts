import { db } from '&/db'
import { format } from 'date-fns'
import { Task } from '../types'
import { DATE_FORMAT } from '&/common/constants'

export const editTaskSchedule = async ({ id, date, scheduleType, period }: Task) => {
  const { error } = await db
    .from('task')
    .update({
      schedule_type: scheduleType,
      period,
      date: date ? format(date, DATE_FORMAT) : null,
    })
    .eq('id', id)
  if (error) throw error
}
