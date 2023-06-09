import { db } from '&/db'
import { RoutineNote } from '../types'

interface FetchRoutineNoteListParams {
  queryKey: [key: string, options: { routineId?: string }]
}

export const fetchRoutineNoteList = async ({ queryKey }: FetchRoutineNoteListParams) => {
  const [, { routineId }] = queryKey

  if (!routineId) throw new Error('Routine ID is missing')

  const { data, error } = await db
    .from('routine_note')
    .select('id, routineId:routine_id, noteId:note_id, note(id, title, created_at)')
    .eq('routine_id', routineId)
  // .order('note(created_at)', { ascending: true })
  // .order('created_at', { foreignTable: 'note', ascending: true })
  console.log('data :', data)
  if (error) throw error
  return data as RoutineNote[]
}
