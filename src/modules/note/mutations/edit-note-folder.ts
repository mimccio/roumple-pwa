import { db } from '@/db'
import { Note } from '../types'

export const editNoteFolder = async ({ id, folder }: Note) => {
  const { data, error } = await db
    .from('note')
    .update({ folder_id: folder?.id || null })
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data
}
