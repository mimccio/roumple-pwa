import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineSchedule = async ({
  id,
  scheduleType,
  period,
  daily_recurrence,
  weekly_recurrence,
  monthly_recurrence,
}: Routine) => {
  const { data, error } = await db
    .from('routine')
    .update({ schedule_type: scheduleType, period, daily_recurrence, weekly_recurrence, monthly_recurrence })
    .eq('id', id)
  if (error) throw error
  return data
}
