import { db } from '&/db'
import { Task } from '../types'

export const fetchTaskList = async () => {
  const { data, error } = await db
    .from('task')
    .select('id, createdAt:created_at, name, description, category(id, name, color)')
    .order('name', { ascending: true })

  if (error) throw error
  return data as Task[]
}
