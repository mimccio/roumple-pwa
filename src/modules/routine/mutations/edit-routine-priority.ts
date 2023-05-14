import { db } from '&/db'

interface Params {
  id: string
  priority: number
}

export const editRoutinePriority = async ({ id, priority }: Params) => {
  const { data, error } = await db.from('routine').update({ priority }).eq('id', id).select('id, priority').single()
  if (error) throw error
  return data
}
