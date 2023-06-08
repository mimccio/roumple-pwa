import { db } from '&/db'

interface FetchNoteListParams {
  queryKey: [key: string, list: string, options: { folderId: string | null; categoryId?: string }]
}

export const fetchNoteList = async ({ queryKey }: FetchNoteListParams) => {
  const [, , { folderId, categoryId }] = queryKey

  let query = db.from('note').select('id, title').order('created_at', { ascending: true })

  if (!folderId || folderId === 'inbox') {
    query = query.is('folder_id', null)
  } else {
    query = query.eq('folder_id', folderId)
  }

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  } else {
    query = query.is('category_id', null)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
