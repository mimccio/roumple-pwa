import { db } from '@/db'
import { NewRoutine } from '../types'

export const createBulkRoutines = async (routines: NewRoutine[]) => {
  const { error } = await db.from('routine').upsert(routines)
  if (error) throw error
}
