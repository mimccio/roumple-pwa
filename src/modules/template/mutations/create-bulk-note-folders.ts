import { db } from '@/db'
import { NewNoteFolder } from '../types'

export const createBulkNoteFolders = async (noteFolders: NewNoteFolder[]) => {
  const { error } = await db.from('note_folder').upsert(noteFolders)
  if (error) throw error
}
