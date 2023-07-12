import { db } from '&/db'
import { getUserId } from '&/modules/utils'
import { TaskNote } from '../types'

export const createTaskNote = async ({ id, noteId, taskId }: TaskNote) => {
  const userId = await getUserId()

  const { error } = await db.from('task_note').insert({ id, note_id: noteId, task_id: taskId, user_id: userId })
  if (error) throw error
}
