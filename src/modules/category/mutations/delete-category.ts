import { db } from '&/db'
import { Category } from '../types'

export const deleteCategory = async ({ id }: Category) => {
  const { error } = await db.from('category').delete().eq('id', id)
  if (error) throw error
}
