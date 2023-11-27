import { db } from '@/db'
import { Task } from '../types'

export const editTaskPriority = async ({ id, priority }: Task) => {
  const { error } = await db.from('task').update({ priority }).eq('id', id)

  if (error) throw error
}
