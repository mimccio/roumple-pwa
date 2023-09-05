import { db } from '&/db'

interface EditChecklistItemParams {
  id: string
  name: string
  routine_id: string
}

export const editRoutineChecklistItem = async ({ id, name }: EditChecklistItemParams) => {
  const { data, error } = await db
    .from('routine_checklist_item')
    .update({ name })
    .eq('id', id)
    .select('id, name, routine_id')
    .single()
  if (error) throw error
  return data
}
