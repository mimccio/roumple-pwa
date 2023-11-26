import { db } from '&/db'
import type { FetchRoutineNoteListByRoutineQueryKey, RoutineNoteByRoutine } from '../types'

export async function fetchRoutineNoteByRoutineList({ queryKey }: { queryKey: FetchRoutineNoteListByRoutineQueryKey }) {
  const [, , routineId] = queryKey
  if (!routineId) throw new Error('Routine ID is missing')

  const { data, error } = await db
    .from('routine_note')
    .select(`id, note(id, title)`)
    .eq('routine_id', routineId)
    .order('note(title)', { ascending: true })

  if (error) throw error
  return data as RoutineNoteByRoutine[]
}
