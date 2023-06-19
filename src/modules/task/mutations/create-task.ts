import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import { Task } from '../types'

export const createTask = async ({ id, createdAt, name, category }: Task) => {
  const userId = await getUserId()

  throw new Error('khjm')

  const { error } = await db.from('task').insert({
    id,
    name,
    user_id: userId,
    created_at: createdAt,
    category_id: category?.id,
  })

  if (error) throw error
}
