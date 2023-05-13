import { db } from '&/db'
import { getUserId } from '&/modules/utils/get-user-id'

interface Params {
  name: string
  id: string
}

export const createRoutine = async ({ id, name }: Params) => {
  const userId = await getUserId()

  const { data, error } = await db
    .from('routine')
    .insert({ id, name, user_id: userId })
    .select('id, name, description')
    .single()
  if (error) throw error
  return data
}
