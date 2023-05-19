import { db } from '&/db'

export const fetchRoutines = async () => {
  const { data, error } = await db
    .from('routine')
    .select('id, name, priority, description, weekly_recurrence, period, type, daily_recurrence')
    .order('priority', { ascending: false })
    .order('name', { ascending: true })
  if (error) throw error
  return data
}
