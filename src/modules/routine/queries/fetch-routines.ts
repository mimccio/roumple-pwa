import { db } from '&/db'

interface FetchRoutineParams {
  queryKey: [key: string, list: string, options: { archived: boolean; categoryId?: string }]
}

export const fetchRoutines = async ({ queryKey }: FetchRoutineParams) => {
  const [, , { archived, categoryId }] = queryKey

  let query = db
    .from('routine')
    .select(
      'id, name, priority, description, archived, type, period, daily_recurrence, weekly_recurrence, monthly_recurrence, category_id, category(id, name, color)'
    )
    .eq('archived', archived)
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
