import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'

interface CreateNoteParams {
  id: string
  // name: string
  categoryId?: string
  folderId?: string
}

export const createNote = async ({ id, categoryId, folderId }: CreateNoteParams) => {
  const user_id = await getUserId()

  const { data, error } = await db
    .from('note')
    .insert({ id, user_id, category_id: categoryId, folder_id: folderId })
    .select('id,  category(id, name), note_folder(id, name)')
    .single()
  if (error) throw error
  return data
}
