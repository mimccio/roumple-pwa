import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { fetchTaskDetail } from '../queries'

export function useTaskDetail() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, isPaused } = useQuery({
    queryKey: TASK_KEYS.detail(taskId),
    queryFn: fetchTaskDetail,
    enabled: Boolean(taskId),
    initialDataUpdatedAt: () => queryClient.getQueryState(TASK_KEYS.list({ done: false }))?.dataUpdatedAt,
    initialData: () =>
      queryClient.getQueryData<Task[]>(TASK_KEYS.list({ done: false }))?.find((item) => item.id === taskId),
  })

  return { task: data, isLoading, isPaused }
}
