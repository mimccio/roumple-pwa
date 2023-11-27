import { db } from '@/db'
import { NewRoutineChecklistItem } from '../types'

export const createBulkRoutineChecklistItems = async (routineChecklistItems: NewRoutineChecklistItem[]) => {
  const { error } = await db.from('routine_checklist_item').upsert(routineChecklistItems)
  if (error) throw error
}
