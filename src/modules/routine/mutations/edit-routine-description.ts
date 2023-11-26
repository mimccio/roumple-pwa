import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineDescription = async ({ id, description }: Routine) => {
  const { error } = await db.from('routine').update({ description }).eq('id', id)
  if (error) throw error
}
