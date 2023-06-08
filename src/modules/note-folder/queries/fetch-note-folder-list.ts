import { db } from '&/db'
import { NoteFolder } from '../types'

export const fetchNoteFolderList = async () => {
  const { data, error } = await db.from('note_folder').select('id, name, noteCount:note(count)').order('created_at')
  if (error) throw error
  return data as NoteFolder[]
}
