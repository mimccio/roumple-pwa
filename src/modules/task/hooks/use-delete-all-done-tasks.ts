import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { STATUSES } from '&/common/constants'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { deleteAllDoneTasks } from '../mutations'

export function useDeleteAllDoneTasks() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { mutate } = useMutation({
    mutationFn: deleteAllDoneTasks,
    onMutate: async () => {
      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list({ done: true }) })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.details() })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.boards() })

      // Update Task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list({ done: true }))
      queryClient.setQueryData(TASK_KEYS.list({ done: true }), () => [])

      // Update Task board list
      const previousTaskBoards = queryClient.getQueryData(TASK_KEYS.boards())
      queryClient.setQueryData(TASK_KEYS.boards(), (old: Task[] = []) =>
        old.filter((item) => item.status !== STATUSES.done)
      )

      return { previousTaskList, previousTaskBoards }
    },
    onError: (_err, _item, context) => {
      queryClient.setQueryData(TASK_KEYS.list({ done: true }), context?.previousTaskList)
      queryClient.setQueryData(TASK_KEYS.boards(), context?.previousTaskBoards)

      toast.error("Deletion didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.list({ done: true }) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.boards() })
    },
  })

  return {
    close: () => setIsOpen(false),
    isOpen,
    onDelete: () => mutate(),
    open: () => setIsOpen(true),
  }
}
