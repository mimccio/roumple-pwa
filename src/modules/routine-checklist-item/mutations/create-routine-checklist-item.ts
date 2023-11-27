import { db } from '@/db'
import { Routine } from '@/modules/routine/types'
import { getUserId } from '@/modules/utils/get-user-id'

interface CreateChecklistItemParams {
  id: string
  routine: Routine
  name: string
}

export const createRoutineChecklistItem = async ({ id, name, routine }: CreateChecklistItemParams) => {
  const user_id = await getUserId()

  const { data, error } = await db
    .from('routine_checklist_item')
    .insert({ id, name, user_id, routine_id: routine.id })
    .select('id, name, routine_id')
    .single()
  if (error) throw error
  return data
}
