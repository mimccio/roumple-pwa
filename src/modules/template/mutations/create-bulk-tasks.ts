import { db } from '&/db'
import { NewTask } from '../types'

export const createBulkTasks = async (tasks: NewTask[]) => {
  const { error } = await db.from('task').upsert(tasks)
  if (error) throw error
}
