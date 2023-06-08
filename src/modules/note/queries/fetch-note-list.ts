import { db } from '&/db'
import { Note } from '../types'

interface FetchNoteListParams {
  queryKey: [key: string, list: string, options: { folderId?: string }]
}

export const fetchNoteList = async ({ queryKey }: FetchNoteListParams) => {
  const [, , { folderId }] = queryKey

  let query = db
    .from('note')
    .select('id, title, created_at, category(id, name, color), folder:note_folder(id, name)')
    .order('created_at', { ascending: true })

  if (!folderId || folderId === 'inbox') {
    query = query.is('folder_id', null)
  } else {
    query = query.eq('folder_id', folderId)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Note[]
}
