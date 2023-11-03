import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'
import { toast } from 'react-hot-toast'

import { STATUSES } from '&/common/constants'
import { useMainPath } from '&/common/hooks'
import type { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import type { Task, TaskScheduleType } from '../types'
import { TASK_KEYS } from '../constants'
import { createTask } from '../mutations'

export function useCreateTask() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const id = uuidv4()
  const [globalCategory, setGlobalCategory] = useAtom(categoryAtom)
  const navigate = useNavigate()
  const mainPath = useMainPath()
  const [name, setName] = useState('')
  const [charNum, setCharNum] = useState(0)
  const [category, setCategory] = useState(globalCategory)
  const [priority, setPriority] = useState(0)
  const [date, setDate] = useState<Date | null>(null)
  const [scheduleType, setScheduleType] = useState<TaskScheduleType>(null)
  const [period, setPeriod] = useState(0)

  useEffect(() => {
    setCategory(globalCategory)
  }, [globalCategory])

  const { mutate } = useMutation({
    mutationFn: createTask,
    onMutate: async (data) => {
      // Cancel list queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list({ done: false }) })
      if (data.date != null && data.scheduleType != null) {
        await queryClient.cancelQueries({
          queryKey: TASK_KEYS.board({ scheduleType: data.scheduleType, date: data.date }),
        })
      }

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(id), () => data)
      // Update task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list({ done: false }))
      queryClient.setQueryData(TASK_KEYS.list({ done: false }), (old: Task[] = []) => [...old, data])

      let previousTaskBoard: Task[] = []
      if (data.date != null && data.scheduleType != null) {
        previousTaskBoard =
          queryClient.getQueryData(TASK_KEYS.board({ scheduleType: data.scheduleType, date: data.date })) || []
        queryClient.setQueryData(
          TASK_KEYS.board({ scheduleType: data.scheduleType, date: data.date }),
          (old: Task[] = []) => [...old, data]
        )
      }

      navigate(`/tasks/d/task/${id}`)
      return { previousTaskList, previousTaskBoard }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(id), null)
      queryClient.setQueryData(TASK_KEYS.list({ done: false }), context?.previousTaskList)
      if (item.date != null && item.scheduleType != null) {
        queryClient.setQueryData(
          TASK_KEYS.board({ scheduleType: item.scheduleType, date: item.date }),
          context?.previousTaskBoard
        )
      }
      navigate(mainPath)
      toast.error(t('errorCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.list({ done: false }) })
    },
  })

  const reset = () => {
    setName('')
    setPriority(0)
    if (category?.id !== globalCategory?.id) setGlobalCategory(null)
    setDate(null)
    setScheduleType(null)
    setPeriod(0)
  }

  const onCreateTask = () => {
    if (charNum === 0) return
    mutate({
      id,
      name,
      created_at: new Date(),
      category,
      priority,
      status: STATUSES.todo,
      period,
      scheduleType,
      date,
      checklist: [],
      checkedItemIds: [],
    })
    reset()
  }

  const handleNameChange = (name: string) => setName(name)
  const onSelectCategory = (category: Category) => setCategory(category)
  const onSelectPriority = (priority: number) => setPriority(priority)
  const onSelectDate = (date: Date | null) => setDate(date)
  const onSelectPeriod = ({ scheduleType, period }: { scheduleType: TaskScheduleType; period: number }) => {
    setScheduleType(scheduleType)
    setPeriod(period)
  }

  return {
    handleNameChange,
    setCharNum,
    onSelectCategory,
    onCreateTask,
    name,
    charNum,
    category: category,
    onSelectPriority,
    priority,
    reset,
    scheduleType,
    period,
    date,
    onSelectDate,
    onSelectPeriod,
  }
}
