import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import { useMainPath } from '&/common/hooks'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { deleteRoutine } from '../mutations'

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mainPath = useMainPath()
  const [isOpen, setIsOpen] = useState(false)

  const date = startOfToday()

  const { mutate } = useMutation(deleteRoutine, {
    onMutate: async (data) => {
      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list() })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), null)

      // Update Task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list())
      queryClient.setQueryData(TASK_KEYS.list(), (old: Task[] = []) => {
        const index = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, index), ...old.slice(index + 1)]
      })

      // TODO: previous Board tasks in case of error
      if (data.date != null && data.scheduleType != null) {
        queryClient.setQueryData(TASK_KEYS.board({ type: data.scheduleType, date }), (old: Task[] = []) => {
          const index = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, index), ...old.slice(index + 1)]
        })
      }

      navigate(mainPath)
      return { previousTaskList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list(), context?.previousTaskList)
      navigate(`${mainPath}/${item.id}`)
      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
      queryClient.invalidateQueries(TASK_KEYS.list())
    },
  })

  return {
    close: () => setIsOpen(false),
    isOpen,
    onDelete: (task: Task) => mutate(task),
    open: () => setIsOpen(true),
  }
}
