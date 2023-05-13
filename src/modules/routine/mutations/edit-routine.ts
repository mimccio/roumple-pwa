import { db } from '&/db'

interface Params {
  name: string
  routineId?: string
  description?: string
}

export const editRoutine = async ({ routineId, name, description }: Params) => {
  if (!routineId) throw new Error('Routine ID is missing')
  const { data, error } = await db
    .from('routine')
    .update({ name, description })
    .eq('id', routineId)
    .select('id, name, description')
    .single()
  if (error) throw error
  return data
}
