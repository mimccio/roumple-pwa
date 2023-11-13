import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { fetchTaskDetail } from '../queries'

export function useTaskDetail() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const getInitialData = () =>
    queryClient.getQueryData<Task[]>(TASK_KEYS.list({ done: false }))?.find((item) => item.id === taskId) ||
    queryClient.getQueryData<Task[]>(TASK_KEYS.list({ done: true }))?.find((item) => item.id === taskId)

  const getUpdatedAt = () =>
    queryClient.getQueryState(TASK_KEYS.list({ done: false }))?.dataUpdatedAt ||
    queryClient.getQueryState(TASK_KEYS.list({ done: true }))?.dataUpdatedAt

  const { data, isLoading, isPaused } = useQuery({
    queryKey: TASK_KEYS.detail(taskId),
    queryFn: fetchTaskDetail,
    enabled: Boolean(taskId),
    initialDataUpdatedAt: getUpdatedAt,
    initialData: getInitialData,
  })

  return { task: data, isLoading, isPaused }
}
