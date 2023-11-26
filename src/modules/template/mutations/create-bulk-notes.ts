import { db } from '&/db'
import { NewNote } from '../types'

export const createBulkNotes = async (notes: NewNote[]) => {
  const { error } = await db.from('note').upsert(notes)
  if (error) throw error
}
