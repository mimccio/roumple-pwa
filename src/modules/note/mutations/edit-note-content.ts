import { db } from '&/db'
import { Note } from '../types'

export const editNoteContent = async ({ id, title, content }: Note) => {
  console.log('title :', title)
  const { data, error } = await db
    .from('note')
    .update({ id, title, content })
    .eq('id', id)
    .select('id, title, content, folder:note_folder(id, name), category(id, name, color)')
    .single()

  if (error) throw error
  return data
}
