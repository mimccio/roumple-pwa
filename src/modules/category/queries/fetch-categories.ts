import { db } from '&/db'

export const fetchCategories = async () => {
  const { data, error } = await db.from('category').select('id, name, color')

  if (error) throw error
  return data
}
