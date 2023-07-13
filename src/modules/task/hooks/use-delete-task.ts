import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import { useMainPath } from '&/common/hooks'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { deleteTask } from '../mutations'
import { STATUSES } from '&/common/constants'

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mainPath = useMainPath()
  const [isOpen, setIsOpen] = useState(false)
  const date = startOfToday()

  const { mutate } = useMutation(deleteTask, {
    onMutate: async (data) => {
      const listKey = TASK_KEYS.list({ done: data.status === STATUSES.done })
      const boardKey = TASK_KEYS.board({ type: data.scheduleType, date })

      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: listKey })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: boardKey })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), null)

      // Update Task list
      const previousTaskList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Task[] = []) => {
        const index = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, index), ...old.slice(index + 1)]
      })

      // Update Task board list
      const previousTaskBoard = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Task[] = []) => {
        const index = old.findIndex((item) => item.id === data.id)
        return index >= 0 ? [...old.slice(0, index), ...old.slice(index + 1)] : old
      })

      navigate(mainPath)
      return { previousTaskList, previousTaskBoard }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list({ done: item.status === STATUSES.done }), context?.previousTaskList)
      queryClient.setQueryData(TASK_KEYS.board({ type: item.scheduleType, date }), context?.previousTaskBoard)
      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
      queryClient.invalidateQueries(TASK_KEYS.list({ done: variables.status === STATUSES.done }))
      queryClient.invalidateQueries(TASK_KEYS.board({ type: variables.scheduleType, date }))
    },
  })

  return {
    close: () => setIsOpen(false),
    isOpen,
    onDelete: (task: Task) => mutate(task),
    open: () => setIsOpen(true),
  }
}
