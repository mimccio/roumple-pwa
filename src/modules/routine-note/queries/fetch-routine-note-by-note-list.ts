import { db } from '@/db'
import type { FetchRoutineNoteListByNoteQueryKey, RoutineNoteByNote } from '../types'

export async function fetchRoutineNoteByNoteList({ queryKey }: { queryKey: FetchRoutineNoteListByNoteQueryKey }) {
  const [, , noteId] = queryKey
  if (!noteId) throw new Error('Note ID is missing')

  const { data, error } = await db
    .from('routine_note')
    .select(`id, routine(id, name)`)
    .eq('note_id', noteId)
    .order('routine(name)', { ascending: true })

  if (error) throw error
  return data as RoutineNoteByNote[]
}
