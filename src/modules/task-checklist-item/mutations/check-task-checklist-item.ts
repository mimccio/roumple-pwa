import { db } from '&/db'
import { Task } from '&/modules/task/types'

export const checkTaskChecklistItem = async ({ newChecklistItem }: Task) => {
  if (!newChecklistItem) throw new Error('newChecklistItem is missing')

  const { error } = await db
    .from('task_checklist_item')
    .update({ checked: newChecklistItem.checked })
    .eq('id', newChecklistItem.id)
  if (error) throw error
}
