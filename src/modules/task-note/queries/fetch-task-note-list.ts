import { db } from '&/db'
import { TaskNote } from '../types'

interface FetchTaskNoteListParams {
  queryKey: readonly [
    'TASK_NOTE',
    'LIST',
    {
      readonly taskId: string | undefined
    }
  ]
}

export const fetchTaskNoteList = async ({ queryKey }: FetchTaskNoteListParams) => {
  const [, , { taskId }] = queryKey

  if (!taskId) throw new Error('Task ID is missing')

  const { data, error } = await db
    .from('task_note')
    .select('id, taskId:task_id, noteId:note_id, note(id, title, created_at)')
    .eq('task_id', taskId)
  // .order('note(created_at)', { ascending: true })
  // .order('created_at', { foreignTable: 'note', ascending: true })

  if (error) throw error
  return data as TaskNote[]
}
