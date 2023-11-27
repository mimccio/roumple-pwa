import { db } from '@/db'
import { Routine } from '../types'

export const editRoutinePriority = async ({ id, priority }: Routine) => {
  const { data, error } = await db.from('routine').update({ priority }).eq('id', id).select('*').single()
  if (error) throw error
  return data
}
