import { db } from '&/db'
import { NoteFolder } from '../types'

interface IParams {
  queryKey: readonly ['NOTE_FOLDER', 'DETAIL', string | undefined]
}

export const fetchNoteFolder = async ({ queryKey }: IParams) => {
  const [, , folderId] = queryKey

  if (!folderId) throw new Error('Folder ID is missing')

  const { data, error } = await db
    .from('note_folder')
    .select('id, name, notes:note(*)')
    .eq('id', folderId)
    .order('created_at', { foreignTable: 'note', ascending: true })
    .single()

  if (error) throw error
  return data as NoteFolder
}
