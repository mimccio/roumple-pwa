import { db } from '&/db'

export const fetchNoteFolderList = async () => {
  const { data, error } = await db.from('note_folder').select('id, name').order('created_at')

  if (error) throw error
  return data
}
