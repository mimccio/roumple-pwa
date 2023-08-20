import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineOccurrence = async ({ id, occurrence }: Routine) => {
  const { error } = await db.from('routine').update({ occurrence }).eq('id', id)
  if (error) throw error
}
