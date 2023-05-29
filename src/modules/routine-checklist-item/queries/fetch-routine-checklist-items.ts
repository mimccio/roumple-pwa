import { db } from '&/db'

export const fetchRoutineChecklistItems = async (routineId: string) => {
  const { data, error } = await db
    .from('checklist_item')
    .select('id, name')
    .eq('routine_id', routineId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
