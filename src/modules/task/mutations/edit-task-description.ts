import { db } from '@/db'
import { Task } from '../types'

export const editTaskDescription = async ({ id, description }: Task) => {
  const { error } = await db.from('task').update({ description }).eq('id', id)
  if (error) throw error
}
