import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutateTask(mutation: (task: Task) => any) {
  const date = startOfToday()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(mutation, {
    onMutate: async (data) => {
      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list() })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.boards() })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), () => data)

      // Update task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list())
      queryClient.setQueryData(TASK_KEYS.list(), (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })
      // Update Board list
      const boardKey = TASK_KEYS.board({ type: data.scheduleType, date })
      const previousBoardList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })
      return { previousTaskList, previousBoardList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list(), context?.previousTaskList)
      queryClient.setQueryData(TASK_KEYS.board({ type: item.scheduleType, date }), context?.previousTaskList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
      queryClient.invalidateQueries(TASK_KEYS.list())
      queryClient.invalidateQueries(TASK_KEYS.board({ type: variables.scheduleType, date }))
    },
  })

  return { mutate }
}
