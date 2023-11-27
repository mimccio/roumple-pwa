import { db } from '@/db'
import { Category } from '@/modules/category/types'

export const createBulkCategories = async (categories: Category[]) => {
  const { error } = await db.from('category').upsert(categories)
  if (error) throw error
}
