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

  const { error } = await db.from('routine').insert({
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

  if (error) throw error
}
