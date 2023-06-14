import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'

interface CreateNoteParams {
  id: string
  categoryId?: string
  created_at: Date
}

export const createNote = async ({ id, categoryId }: CreateNoteParams) => {
  const user_id = await getUserId()

  const { data, error } = await db
    .from('note')
    .insert({ id, user_id, category_id: categoryId })
    .select('id, created_at, category(id, name), note_folder(id, name)')
    .single()
  if (error) throw error
  return data
}
