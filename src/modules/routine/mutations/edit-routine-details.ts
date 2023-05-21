import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineDetails = async ({ id, name, description }: Routine) => {
  const { data, error } = await db
    .from('routine')
    .update({ name, description })
    .eq('id', id)
    .select('id, name, description, archived')
    .single()
  if (error) throw error
  return data
}
