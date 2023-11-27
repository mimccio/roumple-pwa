import { db } from '@/db'
import { Task } from '../types'

export const deleteTask = async ({ id }: Task) => {
  const { data, error } = await db.from('task').delete().eq('id', id)
  if (error) throw error
  return data
}
