import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Routine } from '../types'

export const createRoutine = async ({ id, name, daily_recurrence, period, type }: Routine) => {
  const userId = await getUserId()

  const { data, error } = await db
    .from('routine')
    .insert({ id, name, user_id: userId, priority: 0, type, daily_recurrence, period })
    .select('id, name, description, daily_recurrence, type, period, weekly_recurrence')
    .single()
  if (error) throw error
  return data
}
