import { db } from '&/db'

export const deletedTaskChecklistItem = async (id: string) => {
  const { error } = await db.from('task_checklist_item').delete().eq('id', id)
  if (error) throw error
}
