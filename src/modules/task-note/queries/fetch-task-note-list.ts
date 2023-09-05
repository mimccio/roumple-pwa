import { db } from '&/db'
import { TaskNote } from '../types'

interface FetchTaskNoteListParams {
  queryKey: readonly ['TASK_NOTE', 'LIST', string | undefined]
}

// TODO?: order

export const fetchTaskNoteList = async ({ queryKey }: FetchTaskNoteListParams) => {
  const [, , taskId] = queryKey

  if (!taskId) throw new Error('Task ID is missing')

  const { data, error } = await db.from('task_note').select('id, note(id, title), task(id, name)').eq('task_id', taskId)

  if (error) throw error
  return data as TaskNote[]
}
