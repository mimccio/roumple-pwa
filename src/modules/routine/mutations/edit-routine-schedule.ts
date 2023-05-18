import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineSchedule = async ({
  id,
  recurrence,
  type,
  period,
}: Pick<Routine, 'id' | 'recurrence' | 'type' | 'period'>) => {
  const { data, error } = await db
    .from('routine')
    .update({ recurrence, type, period })
    .eq('id', id)
    .select('id, recurrence, type, period')
    .single()
  if (error) throw error
  return data
}
