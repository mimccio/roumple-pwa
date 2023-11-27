import { db } from '@/db'
import { getUserId } from '@/modules/utils/get-user-id'
import { Category } from '../types'

export const createCategory = async ({ id, name, color }: Category) => {
  const userId = await getUserId()

  const { data, error } = await db
    .from('category')
    .insert({ id, name, user_id: userId, color })
    .select('id, name, color')
    .single()
  if (error) throw error
  return data
}
