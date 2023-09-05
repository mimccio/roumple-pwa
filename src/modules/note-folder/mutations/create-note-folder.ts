import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'
import type { NoteFolder } from '../types'

export const createNoteFolder = async ({ id, name }: NoteFolder) => {
  const user_id = await getUserId()

  const { data, error } = await db
    .from('note_folder')
    .insert({ id, name, user_id })
    .select('id, name, note(id, content)')
    .single()
  if (error) throw error
  return data
}
