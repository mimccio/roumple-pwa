import { db } from '&/db'
import { Category } from '../types'

export const editCategory = async ({ id, name, color }: Category) => {
  const { data, error } = await db
    .from('category')
    .update({ name, color })
    .eq('id', id)
    .select('id, name, color')
    .single()

  if (error) throw error
  return data
}
