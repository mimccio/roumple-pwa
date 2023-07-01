import { db } from '&/db'

import { TaskChecklistItem } from '../types'

export const resetTaskChecklistItem = async (checklist: TaskChecklistItem[]) => {
  const { error } = await db.from('task_checklist_item').upsert(checklist)
  if (error) throw error
}
