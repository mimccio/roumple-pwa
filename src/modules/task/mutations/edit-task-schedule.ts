import { db } from '&/db'
import { Task } from '../types'

export const editTaskSchedule = async ({ id, date, scheduleType, period }: Task) => {
  const { error } = await db.from('task').update({ schedule_type: scheduleType, period, date }).eq('id', id)
  if (error) throw error
}
