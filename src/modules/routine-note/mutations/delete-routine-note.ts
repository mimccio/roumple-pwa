import { db } from '&/db'
import { RoutineNote } from '../types'

export const deleteRoutineNote = async ({ id }: RoutineNote) => {
  const { error } = await db.from('routine_note').delete().eq('id', id)
  if (error) throw error
}
