import { db } from '@/db'

export const deletedRoutineChecklistItem = async (id: string) => {
  const { error } = await db.from('routine_checklist_item').delete().eq('id', id)
  if (error) throw error
}
