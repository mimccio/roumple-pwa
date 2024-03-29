import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { TASK_NOTES_KEYS } from '../constants'

import { fetchTaskNoteList } from '../queries'

export function useTaskNoteList() {
  const { taskId } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: TASK_NOTES_KEYS.list(taskId),
    queryFn: fetchTaskNoteList,
    enabled: Boolean(taskId),
  })

  return { taskNotes: data, isLoading, error }
}
