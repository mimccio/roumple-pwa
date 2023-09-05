import { db } from '&/db'
import { NoteFolder } from '../types'

export const deleteNoteFolder = async ({ id }: NoteFolder) => {
  const { data, error } = await db.from('note_folder').delete().eq('id', id)
  if (error) throw error
  return data
}
