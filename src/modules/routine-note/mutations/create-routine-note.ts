import { db } from '&/db'
import { getUserId } from '&/modules/utils'
import { RoutineNote } from '../types'

export const createRoutineNote = async ({ id, noteId, routineId }: RoutineNote) => {
  const userId = await getUserId()

  const { error } = await db
    .from('routine_note')
    .insert({ id, note_id: noteId, routine_id: routineId, user_id: userId })
    .select('*')
    .single()
  if (error) throw error
}
