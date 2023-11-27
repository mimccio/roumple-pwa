import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import { STATUSES } from '@/common/constants'
import { useMainPath } from '@/common/hooks'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { deleteTask } from '../mutations'
import { NOTE_KEYS } from '@/modules/note/constants'
import { Note } from '@/modules/note/types'

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('error')
  const navigate = useNavigate()
  const mainPath = useMainPath()
  const [isOpen, setIsOpen] = useState(false)
  const date = startOfToday()

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onMutate: async (data) => {
      // 🗝️ Keys
      const listKey = TASK_KEYS.list({ done: data.status === STATUSES.done })
      const boardKey = TASK_KEYS.board({ scheduleType: data.scheduleType, date })

      // Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) }),
        queryClient.cancelQueries({ queryKey: listKey }),
        queryClient.cancelQueries({ queryKey: boardKey }),
      ])

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

      // 🗃️ Update note details
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) => {
        if (!old?.taskNotes?.length) return old
        const taskNotes = old.taskNotes.map((item) => (item.task.id === data.id ? { ...item, deleted: true } : item))
        return { ...old, taskNotes }
      })

      navigate(mainPath)
      return { previousTaskList, previousTaskBoard }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list({ done: item.status === STATUSES.done }), context?.previousTaskList)
      queryClient.setQueryData(TASK_KEYS.board({ scheduleType: item.scheduleType, date }), context?.previousTaskBoard)
      // 🗃️ Revert note details
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) => {
        if (!old) return
        const taskNotes = (old.taskNotes || []).map((taskNote) =>
          taskNote.task.id === item.id ? { ...taskNote, deleted: false } : taskNote
        )
        return { ...old, taskNotes }
      })
      toast.error(t('errorDelete'))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.list({ done: variables.status === STATUSES.done }) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.board({ scheduleType: variables.scheduleType, date }) })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.details() })
    },
  })

  return {
    close: () => setIsOpen(false),
    isOpen,
    onDelete: (task: Task) => mutate(task),
    open: () => setIsOpen(true),
  }
}
