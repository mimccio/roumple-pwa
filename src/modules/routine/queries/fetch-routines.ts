import { db } from '&/db'

export const fetchRoutines = async () => {
  const { data, error } = await db.from('routine').select('id, name')
  if (error) throw error
  return data
}
