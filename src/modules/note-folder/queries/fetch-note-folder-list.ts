import { db } from '&/db'
import { NoteFolder } from '../types'

interface FetchNoteFolderListParams {
  queryKey: [key: string, list: string, options: { categoryId?: string }]
}

export const fetchNoteFolderList = async ({ queryKey }: FetchNoteFolderListParams) => {
  const [, , { categoryId }] = queryKey

  let query = db
    .from('note_folder')
    .select('id, name, noteCount:note!inner(count), notes:note!inner(category_id, id) ')
    .order('created_at')
    .limit(1, { foreignTable: 'notes' })

  if (categoryId) {
    query = query.eq('note.category_id', categoryId)
  }

  const { data, error } = await query
  if (error) throw error
  return data as NoteFolder[]
}
