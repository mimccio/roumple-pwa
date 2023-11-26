import { db } from '&/db'
import { RoutineNoteByRoutine } from '../types'

export const deleteRoutineNote = async (routineNote: RoutineNoteByRoutine) => {
  const { error } = await db.from('routine_note').delete().eq('id', routineNote.id)
  if (error) throw error
}
