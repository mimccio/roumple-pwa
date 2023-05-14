import { db } from '&/db'

interface Params {
  id?: string
}

export const deleteRoutine = async ({ id }: Params) => {
  if (!id) throw new Error('Routine ID is missing')
  const { data, error } = await db.from('routine').delete().eq('id', id)
  if (error) throw error
  return data
}
