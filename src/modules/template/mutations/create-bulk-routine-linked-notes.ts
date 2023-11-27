import { db } from '@/db'
import { NewRoutineNote } from '../types'

export const createBulkRoutineLinkedNotes = async (routineLinkedNotes: NewRoutineNote[]) => {
  const { error } = await db.from('routine_note').upsert(routineLinkedNotes)
  if (error) throw error
}
