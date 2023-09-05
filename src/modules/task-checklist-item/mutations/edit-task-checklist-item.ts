import { db } from '&/db'

interface EditChecklistItemParams {
  id: string
  name: string
}

export const editTaskChecklistItem = async ({ id, name }: EditChecklistItemParams) => {
  const { error } = await db.from('task_checklist_item').update({ name }).eq('id', id)
  if (error) throw error
}
