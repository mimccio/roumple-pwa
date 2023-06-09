import { db } from '&/db'
import { Note } from '../types'

interface IParams {
  queryKey: [key: string, routineId?: string]
}

export const fetchNoteById = async ({ queryKey }: IParams) => {
  const [, noteId] = queryKey

  const { data, error } = await db
    .from('note')
    .select(
      'id, title, created_at, content, folder:note_folder(id, name), category(id, name, color), routineNotes:routine_note(routineId:routine_id)'
    )
    .eq('id', noteId)
    .order('created_at')
    .single()

  if (error) throw error
  return data as Note
}
