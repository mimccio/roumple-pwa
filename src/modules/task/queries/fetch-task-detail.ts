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
    .select(
      'id, name, created_at, priority, status, description, category(id, name, color), scheduleType:schedule_type, period, date, checklist:task_checklist_item(id, name, created_at, checked, task_id, user_id)'
    )
    .eq('id', taskId)
    .order('created_at')
    .order('created_at', { foreignTable: 'task_checklist_item', ascending: true })
    .single()

  if (error) throw error

  return data as Task
}
