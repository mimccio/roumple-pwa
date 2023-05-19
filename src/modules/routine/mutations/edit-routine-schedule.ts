import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineSchedule = async ({
  id,
  daily_recurrence,
  weekly_recurrence,
  type,
  period,
}: Pick<Routine, 'weekly_recurrence' | 'daily_recurrence' | 'period' | 'type' | 'id' | 'monthly_recurrence'>) => {
  const { data, error } = await db
    .from('routine')
    .update({ daily_recurrence, type, period, weekly_recurrence })
    .eq('id', id)
    .select('id, daily_recurrence, type, period, weekly_recurrence')
    .single()
  if (error) throw error
  return data
}
