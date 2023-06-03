import { db } from '&/db'
import { Routine } from '../types'

export const editRoutineName = async ({ id, name }: Routine) => {
  const { data, error } = await db.from('routine').update({ name }).eq('id', id).select('*').single()
  if (error) throw error
  return data
}
