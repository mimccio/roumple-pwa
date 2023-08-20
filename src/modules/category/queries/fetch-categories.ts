import { db } from '&/db'

export const fetchCategories = async () => {
  const { data, error } = await db.from('category').select('id, name, color').order('created_at').limit(100)

  if (error) throw error
  return data
}
