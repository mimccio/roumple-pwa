import { db } from '&/db'
import { Note } from '../types'

interface FetchNoteSearchParams {
  queryKey: readonly ['NOTE', 'SEARCH', { readonly searchText: string | undefined }]
}

export const fetchNoteSearch = async ({ queryKey }: FetchNoteSearchParams) => {
  const [, , { searchText }] = queryKey

  let query = db.from('note').select('id, title').order('created_at', { ascending: false })

  if (searchText?.length) {
    query = query.textSearch('title', `${searchText}`, { type: 'websearch', config: 'english' }).limit(20)
  } else {
    query = query.limit(5)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Note[]
}
