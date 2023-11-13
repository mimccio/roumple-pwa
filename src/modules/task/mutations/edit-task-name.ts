// import { db } from '&/db'
import { Task } from '../types'

export const editTaskName = async ({ id, name }: Task) => {
  // const { error } = await db.from('task').update({ name }).eq('id', id)
  // if (error) throw error
  console.log('id, name :', id, name)
  return undefined
}
