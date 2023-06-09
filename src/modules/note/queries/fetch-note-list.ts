import { db } from '&/db'
import { Note, NoteListQueryKey } from '../types'

interface FetchNoteListParams {
  queryKey: NoteListQueryKey
  limit?: number
}

export const fetchNoteList = async ({ queryKey, limit }: FetchNoteListParams) => {
  const [, , { folderId }] = queryKey

  let query = db
    .from('note')
    .select('id, title, created_at, category(id, name, color), folder:note_folder(id, name)')
    .order('created_at', { ascending: false })

  if (!folderId || folderId === 'inbox') {
    query = query.is('folder_id', null)
  } else {
    query = query.eq('folder_id', folderId)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Note[]
}
