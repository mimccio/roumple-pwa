import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { startOfToday } from 'date-fns'
import toast from 'react-hot-toast'

import { STATUSES } from '&/common/constants'
import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { editTaskName } from '../mutations'

export function useEditTaskName(task: Task) {
  const { t } = useTranslation('error')
  const date = startOfToday()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: editTaskName,
    onMutate: async (data) => {
      // 🗝️ Keys
      const detailKey = TASK_KEYS.detail(data.id)
      const taskListKey = TASK_KEYS.list({ done: data.status === STATUSES.done })
      const boardKey = TASK_KEYS.board({ scheduleType: data.scheduleType, date })

      // ✖️ Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: taskListKey }),
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: boardKey }),
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.details() }),
      ])

      // ⛳ Update item
      const prevTask = queryClient.getQueryData<Task>(detailKey)
      queryClient.setQueryData(detailKey, data)

      // 🗃️ Update task list
      const previousTaskList = queryClient.getQueryData(taskListKey)
      queryClient.setQueryData(taskListKey, (old: Task[] = []) =>
        old.map((item) => (item.id === data.id ? data : item))
      )

      // 🗃️ Update Board list
      const previousBoardList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Task[] = []) => old.map((item) => (item.id === data.id ? data : item)))

      // 🗃️ Update note details
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) => {
        if (!old?.taskNotes?.length) return old
        const taskNotes = old.taskNotes.map((item) =>
          item.task.id === data.id ? { ...item, task: { ...item.task, name: data.name } } : item
        )
        return { ...old, taskNotes }
      })

      return { previousTaskList, previousBoardList, prevTask }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), context?.prevTask)
      queryClient.setQueryData(TASK_KEYS.list({ done: item.status === STATUSES.done }), context?.previousTaskList)
      queryClient.setQueryData(TASK_KEYS.board({ scheduleType: item.scheduleType, date }), context?.previousBoardList)

      // 🗃️ Update note details
      const name = context?.prevTask?.name
      if (name) {
        queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) => {
          if (!old?.taskNotes?.length) return old
          const taskNotes = old.taskNotes.map((item) =>
            item.task.id === item.id ? { ...item, task: { ...item.task, name } } : item
          )
          return { ...old, taskNotes }
        })
      }
      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.list({ done: variables.status === STATUSES.done }) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.board({ scheduleType: variables.scheduleType, date }) })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.details() })
    },
  })

  const submit = (name: string) => {
    if (!name.length) return
    mutate({ ...task, name })
  }
  return { submit }
}
