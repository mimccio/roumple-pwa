import { db } from '&/db'
import { Note } from '../types'

export const deleteNote = async ({ id }: Note) => {
  const { data, error } = await db.from('note').delete().eq('id', id)
  if (error) throw error
  return data
}
