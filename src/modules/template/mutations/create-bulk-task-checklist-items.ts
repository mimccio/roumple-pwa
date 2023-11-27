import { db } from '@/db'
import { NewTaskChecklistItem } from '../types'

export const createBulkTaskChecklistItems = async (taskChecklistItems: NewTaskChecklistItem[]) => {
  const { error } = await db.from('task_checklist_item').upsert(taskChecklistItems)
  if (error) throw error
}
