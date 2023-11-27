import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { endOfMonth, endOfWeek, startOfMonth, startOfToday, startOfWeek } from 'date-fns'
import { toast } from 'react-hot-toast'

import { SCHEDULE_TYPES, STATUSES } from '@/common/constants'
import type { Task, TaskScheduleType } from '../types'
import { sortTaskByDate } from '../utils'
import { TASK_KEYS } from '../constants'
import { editTaskSchedule } from '../mutations'

export function useTaskSchedule(task: Task) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const [scheduleType, setScheduleType] = useState(task.scheduleType)
  const [period, setPeriod] = useState(task.period)
  const [date, setDate] = useState(task.date ? new Date(task.date) : null)
  const todayDate = startOfToday()

  const onSelectPeriod = ({ scheduleType, period }: { scheduleType: TaskScheduleType; period: number }) => {
    setScheduleType(scheduleType)
    setPeriod(period)
  }

  const onSelectDate = (date: Date | null) => setDate(date)

  const { mutate } = useMutation({
    mutationFn: editTaskSchedule,
    onMutate: async (data) => {
      const listKey = TASK_KEYS.list({ done: data.status === STATUSES.done })

      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: listKey })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.boards() })

      // Update item
      const prevTask = queryClient.getQueryData(TASK_KEYS.detail(data.id))
      queryClient.setQueryData(TASK_KEYS.detail(data.id), () => data)

      // Update task list
      const previousTaskList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)].sort(sortTaskByDate)
      })

      // Update previous Board list
      const prevBoardKey = TASK_KEYS.board({ scheduleType: task.scheduleType, date: todayDate })
      const prevPreviousBoardList = queryClient.getQueryData(prevBoardKey)
      queryClient.setQueryData(prevBoardKey, (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), ...old.slice(i + 1)]
      })

      // Update new Board list
      const newBoardKey = TASK_KEYS.board({ scheduleType: data.scheduleType, date: todayDate })
      const prevNewBoardList = queryClient.getQueryData(newBoardKey)
      queryClient.setQueryData(newBoardKey, (old: Task[] = []) => [...old, data])

      return { previousTaskList, prevPreviousBoardList, prevNewBoardList, prevTask }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), context?.prevTask)
      queryClient.setQueryData(TASK_KEYS.list({ done: item.status === STATUSES.done }), context?.previousTaskList)
      queryClient.setQueryData(
        TASK_KEYS.board({ scheduleType: task.scheduleType, date: todayDate }),
        context?.prevPreviousBoardList
      )
      queryClient.setQueryData(
        TASK_KEYS.board({ scheduleType: item.scheduleType, date: todayDate }),
        context?.prevNewBoardList
      )
      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.list({ done: variables.status === STATUSES.done }) })
      queryClient.invalidateQueries({
        queryKey: TASK_KEYS.board({ scheduleType: variables.scheduleType, date: todayDate }),
      })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.board({ scheduleType: task.scheduleType, date: todayDate }) })
    },
  })

  const onSubmit = () => {
    const getDate = () => {
      if (!date) return null
      if (scheduleType === SCHEDULE_TYPES.monthly) {
        return period === 1 ? startOfMonth(date) : endOfMonth(date)
      }
      if (scheduleType === SCHEDULE_TYPES.weekly) {
        return period === 1 ? startOfWeek(date) : endOfWeek(date)
      }
      return date
    }

    mutate({ ...task, scheduleType, period, date: getDate() })
  }

  const reset = () => {
    setScheduleType(task.scheduleType)
    setPeriod(task.period)
    setDate(task.date ? new Date(task.date) : null)
  }

  useEffect(() => {
    setScheduleType(task.scheduleType)
    setPeriod(task.period)
    setDate(task.date ? new Date(task.date) : null)
  }, [task.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return { onSelectPeriod, onSelectDate, onSubmit, scheduleType, period, date, reset }
}
