import { db } from '&/db'
import { RoutineNote } from '../types'

interface FetchRoutineNoteListParams {
  queryKey: readonly [
    'ROUTINE_NOTE',
    'LIST',
    {
      readonly routineId: string | undefined
    }
  ]
}

export const fetchRoutineNoteList = async ({ queryKey }: FetchRoutineNoteListParams) => {
  const [, , { routineId }] = queryKey
  if (!routineId) throw new Error('Routine ID is missing')

  const { data, error } = await db
    .from('routine_note')
    .select('id, routineId:routine_id, noteId:note_id, note(id, title, created_at)')
    .eq('routine_id', routineId)

  if (error) throw error
  return data as RoutineNote[]
}
