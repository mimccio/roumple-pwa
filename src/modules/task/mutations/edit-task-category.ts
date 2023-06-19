import { db } from '&/db'
import { Task } from '../types'

export const editTaskCategory = async ({ id, category }: Task) => {
  const { error } = await db
    .from('task')
    .update({ category_id: category?.id || null })
    .eq('id', id)

  if (error) throw error
}
