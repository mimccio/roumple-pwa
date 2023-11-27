import { db } from '@/db'
import { Task } from '@/modules/task/types'
import { getUserId } from '@/modules/utils/get-user-id'

interface CreateChecklistItemParams {
  id: string
  task: Task
  name: string
  created_at: Date
}

export const createTaskChecklistItem = async ({ id, name, task, created_at }: CreateChecklistItemParams) => {
  const user_id = await getUserId()

  const { error } = await db
    .from('task_checklist_item')
    .insert({ id, name, user_id, task_id: task.id, created_at })
    .single()
  if (error) throw error
}
