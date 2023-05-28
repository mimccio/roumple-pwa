import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Routine } from '../types'

export const createRoutine = async ({ id, name, daily_recurrence, period, type, category }: Routine) => {
  const userId = await getUserId()

  const { data, error } = await db
    .from('routine')
    .insert({ id, name, user_id: userId, priority: 0, type, daily_recurrence, period, category_id: category?.id })
    .select('id, name, description, daily_recurrence, type, period, weekly_recurrence, monthly_recurrence')
    .single()
  if (error) throw error
  return data
}
