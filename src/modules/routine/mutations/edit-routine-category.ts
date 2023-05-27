import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineCategory = async ({ id, category }: Routine) => {
  const { data, error } = await db
    .from('routine')
    .update({ category_id: category?.id || null })
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data
}
