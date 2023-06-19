import { db } from '&/db'
import { Task } from '../types'

interface IParams {
  queryKey: readonly ['TASK', 'DETAIL', string | undefined]
}

export const fetchTaskDetail = async ({ queryKey }: IParams) => {
  const [, , taskId] = queryKey
  if (!taskId) throw new Error('task id is missing')

  const { data, error } = await db
    .from('task')
    .select('id, name, createdAt:created_at, description, category(id, name, color)')
    .eq('id', taskId)
    .order('created_at')
    .single()

  if (error) throw error
  return data as Task
}
