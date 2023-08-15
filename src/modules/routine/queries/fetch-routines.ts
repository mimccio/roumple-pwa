import { db } from '&/db'
import { Routine } from '../types'

interface FetchRoutineParams {
  queryKey: readonly [
    'ROUTINE',
    'LIST',
    {
      readonly archived: boolean
    }
  ]
}

export const fetchRoutines = async ({ queryKey }: FetchRoutineParams) => {
  const [, , { archived }] = queryKey

  const { data, error } = await db
    .from('routine')
    .select(
      'id, created_at, name, priority, archived, type, period, daily_recurrence, weekly_recurrence, monthly_recurrence, category(id, name, color)'
    )
    .eq('archived', archived)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (error) throw error
  return data as Routine[]
}
