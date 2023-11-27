import { db } from '@/db'
import { getUserId } from '@/modules/utils/get-user-id'
import type { Note } from '../types'

export const createNote = async ({ id, category, folder }: Note) => {
  const user_id = await getUserId()

  const { data, error } = await db
    .from('note')
    .insert({ id, user_id, category_id: category?.id, folder_id: folder?.id })
    .select('id, created_at, category(id, name), note_folder(id, name)')
    .single()
  if (error) throw error
  return data
}
