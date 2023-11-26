import { db } from '&/db'
import { NoteFolder } from '../types'

interface FetchNoteFolderListParams {
  queryKey: readonly ['NOTE_FOLDER', 'LIST', { readonly categoryId?: string | null }]
}

export const fetchNoteFolderList = async ({ queryKey }: FetchNoteFolderListParams) => {
  const [, , { categoryId }] = queryKey

  let query

  if (categoryId) {
    query = db
      .from('note_folder')
      .select('id, name, noteCount:note!inner(count), notes:note!inner(category_id, id)')
      .order('created_at')
      .limit(1, { foreignTable: 'notes' })
      .eq('note.category_id', categoryId)
  } else {
    query = db.from('note_folder').select('id, name, noteCount:note(count)').order('created_at')
  }

  const { data, error } = await query
  if (error) throw error
  return data as NoteFolder[]
}
