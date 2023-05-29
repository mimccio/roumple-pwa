import { db } from '&/db'

interface CreateChecklistItemParams {
  id: string
  name: string
}

export const editRoutineChecklistItem = async ({ id, name }: CreateChecklistItemParams) => {
  throw new Error('qlskdfj')

  const { data, error } = await db
    .from('routine_checklist_item')
    .update({ name })
    .eq('id', id)
    .select('id, name')
    .single()
  if (error) throw error
  return data
}
