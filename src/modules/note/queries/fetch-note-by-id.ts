import { db } from '@/db'
import { Note } from '../types'

interface IParams {
  queryKey: readonly ['NOTE', 'DETAIL', string | undefined]
}

export const fetchNoteById = async ({ queryKey }: IParams) => {
  const [, , noteId] = queryKey

  const { data, error } = await db
    .from('note')
    .select(
      `id, 
      title, 
      created_at, 
      content, 
      folder:note_folder(id, name), 
      category(id, name, color), 
      taskNotes:task_note(id, task(id, name))`
    )
    .eq('id', noteId)
    .order('created_at')
    .single()

  if (error) throw error
  return data as Note
}
