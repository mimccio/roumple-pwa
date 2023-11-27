import { db } from '@/db'
import { getUserId } from '@/modules/utils/get-user-id'
import { Routine } from '../types'

export const createRoutine = async ({
  id,
  created_at,
  name,
  scheduleType,
  daily_recurrence,
  weekly_recurrence,
  monthly_recurrence,
  period,
  category,
  priority,
  occurrence,
}: Routine) => {
  const userId = await getUserId()

  const { error } = await db.from('routine').insert({
    id,
    name,
    user_id: userId,
    created_at,
    priority,
    schedule_type: scheduleType,
    daily_recurrence,
    weekly_recurrence,
    monthly_recurrence,
    period,
    category_id: category?.id,
    occurrence,
  })

  if (error) throw error
}
