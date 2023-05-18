import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Routine } from '../types'

export const createRoutine = async ({ id, name, recurrence, period, type }: Routine) => {
  const userId = await getUserId()

  const { data, error } = await db
    .from('routine')
    .insert({ id, name, user_id: userId, priority: 0, type, recurrence, period })
    .select('id, name, description, recurrence, type, period')
    .single()
  if (error) throw error
  return data
}
