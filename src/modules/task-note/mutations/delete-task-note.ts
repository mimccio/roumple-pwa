import { db } from '@/db'
import { TaskNote } from '../types'

export const deleteTaskNote = async ({ id }: TaskNote) => {
  const { error } = await db.from('task_note').delete().eq('id', id)
  if (error) throw error
}
