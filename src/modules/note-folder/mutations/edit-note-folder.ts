import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import type { NoteFolder } from '../types'

export const editNoteFolder = async ({ id, name }: NoteFolder) => {
  const user_id = await getUserId()

  const { data, error } = await db.from('note_folder').update({ id, name, user_id }).eq('id', id)

  if (error) throw error
  return data
}
