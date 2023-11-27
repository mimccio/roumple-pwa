import { db } from '@/db'
import { Task } from '../types'

export const editTaskStatus = async ({ id, status, checkedItemIds }: Task) => {
  const { error } = await db.from('task').update({ status, checked_item_ids: checkedItemIds }).eq('id', id)
  if (error) throw error
}
