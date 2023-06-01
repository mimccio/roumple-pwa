import { db } from '&/db'
import { Routine } from '../types'

interface IParams {
  queryKey: [key: string, routineId?: string]
}

export const fetchRoutineById = async ({ queryKey }: IParams) => {
  const [, routineId] = queryKey

  if (!routineId) throw new Error('routine id is missing')

  const { data, error } = await db
    .from('routine')
    .select(
      'id, name, created_at, description, priority, archived, weekly_recurrence, period, type, daily_recurrence, monthly_recurrence, actions:routine_action(id, status, date), category_id, category(id, name, color), checklist:routine_checklist_item(id, name, created_at, routine_id)'
    )
    .eq('id', routineId)
    .single()

  if (error) throw error
  return data as Routine
}
