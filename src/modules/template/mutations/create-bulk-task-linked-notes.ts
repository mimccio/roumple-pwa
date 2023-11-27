import { db } from '@/db'
import { NewTaskNote } from '../types'

export const createBulkTaskLinkedNotes = async (taskLinkedNotes: NewTaskNote[]) => {
  const { error } = await db.from('task_note').upsert(taskLinkedNotes)
  if (error) throw error
}
