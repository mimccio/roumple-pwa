import { db } from '&/db'
import { Task } from '../types'

export const editTaskStatus = async ({ id, status }: Task) => {
  const { error } = await db.from('task').update({ status }).eq('id', id)
  if (error) throw error
}
