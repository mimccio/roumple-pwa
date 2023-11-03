import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import { STATUSES } from '&/common/constants'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutateTask(mutation: (task: Task) => any) {
  const { t } = useTranslation('error')
  const date = startOfToday()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: mutation,
    onMutate: async (data) => {
      const taskListKey = TASK_KEYS.list({ done: data.status === STATUSES.done })

      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: taskListKey })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.boards() })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), () => data)

      // Update task list
      const previousTaskList = queryClient.getQueryData(taskListKey)
      queryClient.setQueryData(taskListKey, (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })
      // Update Board list
      const boardKey = TASK_KEYS.board({ scheduleType: data.scheduleType, date })
      const previousBoardList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })
      return { previousTaskList, previousBoardList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list({ done: item.status === STATUSES.done }), context?.previousTaskList)
      queryClient.setQueryData(TASK_KEYS.board({ scheduleType: item.scheduleType, date }), context?.previousTaskList)
      toast.error(t('errorModification'))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.list({ done: variables.status === STATUSES.done }) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.board({ scheduleType: variables.scheduleType, date }) })
    },
  })

  return { mutate }
}
