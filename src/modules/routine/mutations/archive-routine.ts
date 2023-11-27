import { db } from '@/db'
import { Routine } from '../types'

export const archiveRoutine = async ({ id, archived }: Routine) => {
  const { data, error } = await db.from('routine').update({ archived }).eq('id', id).select('*').single()
  if (error) throw error
  return data
}
