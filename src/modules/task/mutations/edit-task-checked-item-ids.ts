import { db } from '&/db'
import { Task } from '../types'

export const editTaskCheckedItemIds = async ({ id, checkedItemIds }: Task) => {
  const { error } = await db.from('task').update({ checked_item_ids: checkedItemIds }).eq('id', id)
  if (error) throw error
}
