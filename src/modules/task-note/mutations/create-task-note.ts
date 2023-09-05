import { db } from '&/db'
import { getUserId } from '&/modules/utils'
import { TaskNote } from '../types'

export const createTaskNote = async ({ id, note, task }: TaskNote) => {
  const user_id = await getUserId()

  const { error } = await db.from('task_note').insert({ id, user_id, note_id: note.id, task_id: task.id })
  if (error) throw error
}
