import { db } from '@/db'
import { STATUSES } from '@/common/constants'
import { Task } from '../types'

interface FetchTaskListParams {
  queryKey: readonly ['TASK', 'LIST', { done: boolean }]
}

export const fetchTaskList = async ({ queryKey }: FetchTaskListParams) => {
  const [, , { done }] = queryKey

  let query = db
    .from('task')
    .select(
      `id,
      name,
      created_at,
      priority,
      status,
      description,
      category(id, name, color),
      scheduleType:schedule_type,
      period,
      date,
      showChecklist: show_checklist,
      checklist:task_checklist_item(id, name, created_at, task_id, user_id),
      checkedItemIds: checked_item_ids`
    )
    .order('date', { ascending: true })

  if (done) {
    query = query.eq('status', STATUSES.done)
  } else {
    query = query.neq('status', STATUSES.done)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Task[]
}
