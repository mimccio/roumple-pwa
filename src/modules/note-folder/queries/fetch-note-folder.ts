import { db } from '&/db'

interface IParams {
  queryKey: [key: string, routineId?: string]
}

export const fetchNoteFolder = async ({ queryKey }: IParams) => {
  const [, folderId] = queryKey

  const { data, error } = await db
    .from('note_folder')
    .select('id, name, notes:note(*)')
    .eq('id', folderId)
    .order('created_at', { foreignTable: 'note', ascending: true })
    .single()

  if (error) throw error
  return data
}
