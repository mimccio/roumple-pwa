import { db } from '&/db'
import type { Routine } from '../types'

interface IParams {
  queryKey: readonly ['ROUTINE', 'DETAIL', string | undefined]
}

export const fetchRoutineById = async ({ queryKey }: IParams) => {
  const [, , routineId] = queryKey

  if (!routineId) throw new Error('routine id is missing')

  const { data, error } = await db
    .from('routine')
    .select(
      `id,
      name,
      created_at,
      description,
      priority,
      archived,
      weekly_recurrence,
      period,
      scheduleType: schedule_type,
      daily_recurrence,
      monthly_recurrence,
      occurrence,
      category_id,
      showChecklist: show_checklist,
      category(id, name, color),
      checklist:routine_checklist_item(id, name, created_at, routine_id)`
    )
    .eq('id', routineId)
    .order('created_at', { foreignTable: 'routine_checklist_item', ascending: true })
    .returns<Routine>()
    .single()

  if (error) throw error
  return data as Routine
}
