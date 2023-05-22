import { db } from '&/db'
import { Routine } from '../types'

export const deleteRoutine = async ({ id }: Routine) => {
  const { data, error } = await db.from('routine').delete().eq('id', id)
  if (error) throw error
  return data
}
