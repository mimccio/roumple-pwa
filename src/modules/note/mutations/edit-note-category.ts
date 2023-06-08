import { db } from '&/db'
import { Note } from '../types'

export const editNoteCategory = async ({ id, category }: Note) => {
  const { data, error } = await db
    .from('note')
    .update({ category_id: category?.id || null })
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data
}
