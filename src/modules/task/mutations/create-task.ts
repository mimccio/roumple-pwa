import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Task } from '../types'

export const createTask = async ({ id, created_at, name, category, priority, period, scheduleType, date }: Task) => {
  const user_id = await getUserId()

  const { error } = await db.from('task').insert({
    id,
    name,
    user_id,
    created_at,
    category_id: category?.id,
    priority,
    period,
    schedule_type: scheduleType,
    date,
  })

  if (error) throw error
}
