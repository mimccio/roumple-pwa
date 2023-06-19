import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { fetchTaskDetail } from '../queries'

export function useTaskDetail() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, isPaused } = useQuery(TASK_KEYS.detail(taskId), fetchTaskDetail, {
    enabled: Boolean(taskId),
    initialDataUpdatedAt: () => queryClient.getQueryState(TASK_KEYS.list())?.dataUpdatedAt,
    initialData: () => queryClient.getQueryData<Task[]>(TASK_KEYS.list())?.find((item) => item.id === taskId),
  })

  return { task: data, isLoading, isPaused }
}
