import { db } from '&/db'
import { Task } from '../types'

export const deleteRoutine = async ({ id }: Task) => {
  const { data, error } = await db.from('task').delete().eq('id', id)
  if (error) throw error
  return data
}
