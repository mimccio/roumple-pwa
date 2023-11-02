import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineDescription = async ({ id, description }: Routine) => {
  throw new Error('desc')

  const { data, error } = await db.from('routine').update({ description }).eq('id', id).select('*').single()
  if (error) throw error
  return data
}
