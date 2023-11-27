import { db } from '@/db'
import { Routine } from '../types'

export const editRoutineName = async ({ id, name }: Pick<Routine, 'id' | 'name'>) => {
  const { error } = await db.from('routine').update({ name }).eq('id', id)
  if (error) throw error
}
