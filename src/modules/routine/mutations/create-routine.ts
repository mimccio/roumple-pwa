import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Routine } from '../types'

export const createRoutine = async ({
  id,
  created_at,
  name,
  type,
  daily_recurrence,
  weekly_recurrence,
  monthly_recurrence,
  period,
  category,
  priority,
}: Routine) => {
  const userId = await getUserId()

  const { data, error } = await db
    .from('routine')
    .insert({
      id,
      name,
      user_id: userId,
      created_at,
      priority,
      type,
      daily_recurrence,
      weekly_recurrence,
      monthly_recurrence,
      period,
      category_id: category?.id,
    })
    .select('id, name, created_at, priority, daily_recurrence, type, period, weekly_recurrence, monthly_recurrence')
    .single()
  if (error) throw error
  return data
}
