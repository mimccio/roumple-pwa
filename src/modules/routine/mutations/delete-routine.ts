import { db } from '&/db'

interface Params {
  routineId?: string
}

export const deleteRoutine = async ({ routineId }: Params) => {
  if (!routineId) throw new Error('Routine ID is missing')
  const { data, error } = await db.from('routine').delete().eq('id', routineId)
  if (error) throw error
  return data
}
