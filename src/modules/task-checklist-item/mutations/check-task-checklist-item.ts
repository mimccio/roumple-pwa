import { db } from '&/db'

import { TaskChecklistItem } from '../types'

export const checkTaskChecklistItem = async ({ id, checked }: TaskChecklistItem) => {
  const { error } = await db.from('task_checklist_item').update({ checked }).eq('id', id)
  if (error) throw error
}
