import { db } from '&/db'

interface Params {
  name: string
  id: string
  description?: string
}

export const editRoutineDetails = async ({ id, name, description }: Params) => {
  const { data, error } = await db
    .from('routine')
    .update({ name, description })
    .eq('id', id)
    .select('id, name, description')
    .single()
  if (error) throw error
  return data
}
