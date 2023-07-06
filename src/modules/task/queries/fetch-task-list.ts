import { db } from '&/db'
import { Task } from '../types'

export const fetchTaskList = async () => {
  const { data, error } = await db
    .from('task')
    .select(
      'id, name, created_at, priority, status, description, category(id, name, color), scheduleType:schedule_type, period, date, checklist:task_checklist_item(id, name, created_at, task_id, user_id), checkedItemIds: checked_item_ids'
    )
    .order('date', { ascending: true })

  if (error) throw error
  return data as Task[]
}
