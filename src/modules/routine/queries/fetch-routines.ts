import { db } from '&/db'

interface FetchRoutineParams {
  queryKey: [key: string, options: { archived: boolean }]
}

export const fetchRoutines = async ({ queryKey }: FetchRoutineParams) => {
  const [, { archived }] = queryKey

  const { data, error } = await db
    .from('routine')
    .select(
      'id, name, priority, description, archived, type, period, daily_recurrence, weekly_recurrence, monthly_recurrence'
    )
    .eq('archived', archived)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })
  if (error) throw error
  return data
}
