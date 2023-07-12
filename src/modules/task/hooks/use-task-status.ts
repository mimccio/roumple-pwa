import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import type { Status } from '&/common/types'
import { STATUSES } from '&/common/constants'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { editTaskStatus } from '../mutations'

export function useTaskStatus(task: Task) {
  const date = startOfToday()

  const queryClient = useQueryClient()

  // TODO: sort

  const { mutate } = useMutation(editTaskStatus, {
    onMutate: async (data) => {
      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.lists() })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.boards() })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), () => data)

      // Update done task list
      const previousDoneTaskList = queryClient.getQueriesData(TASK_KEYS.list({ done: true }))
      queryClient.setQueryData(TASK_KEYS.list({ done: true }), (old: Task[] = []) => {
        if (data.status === STATUSES.done) {
          return task.status !== data.status ? [...old, data] : old
        } else {
          const i = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, i), ...old.slice(i + 1)]
        }
      })

      // Update not done task list
      const previousNotDoneTaskList = queryClient.getQueriesData(TASK_KEYS.list({ done: false }))
      queryClient.setQueryData(TASK_KEYS.list({ done: false }), (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        if (data.status !== STATUSES.done) {
          return i >= 0 ? [...old.slice(0, i), data, ...old.slice(i + 1)] : [...old, data]
        } else {
          return i >= 0 ? [...old.slice(0, i), ...old.slice(i + 1)] : old
        }
      })

      // Update Board list
      const boardKey = TASK_KEYS.board({ type: data.scheduleType, date })
      const previousBoardList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })
      return { previousDoneTaskList, previousNotDoneTaskList, previousBoardList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list({ done: true }), context?.previousDoneTaskList)
      queryClient.setQueryData(TASK_KEYS.list({ done: false }), context?.previousNotDoneTaskList)
      queryClient.setQueryData(TASK_KEYS.board({ type: item.scheduleType, date }), context?.previousBoardList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
      queryClient.invalidateQueries(TASK_KEYS.lists())
      queryClient.invalidateQueries(TASK_KEYS.board({ type: variables.scheduleType, date }))
    },
  })

  let checkedItemIds = task.checkedItemIds
  const onSelect = (status: Status) => {
    if (status === STATUSES.todo) {
      checkedItemIds = []
    }
    mutate({ ...task, status, checkedItemIds })
  }

  return { onSelect }
}
