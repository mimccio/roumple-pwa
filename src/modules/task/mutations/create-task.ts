import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Task } from '../types'

export const createTask = async ({ id, createdAt, name, category, priority }: Task) => {
  const user_id = await getUserId()

  const { error } = await db.from('task').insert({
    id,
    name,
    user_id,
    created_at: createdAt,
    category_id: category?.id,
    priority,
  })

  if (error) throw error
}
