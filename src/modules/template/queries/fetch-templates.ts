import { db } from '&/db'

export const fetchTemplates = async () => {
  const { data, error } = await db
    .from('template')
    .select('id, name, description, createdAt:created_at, published')
    .eq('published', true)
    .order('created_at')
    .limit(10)

  if (error) throw error
  return data
}
