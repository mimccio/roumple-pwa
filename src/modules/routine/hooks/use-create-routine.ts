import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'
import { startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import type { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { createRoutine } from '../mutations'

export function useCreateRoutine() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [globalCategory, setGlobalCategory] = useAtom(categoryAtom)
  const [name, setName] = useState('')
  const [charNum, setCharNum] = useState(0)
  const [currentType, setType] = useState<ScheduleType>(SCHEDULE_TYPES.daily)
  const [currentPeriod, setPeriod] = useState(3)
  const [dailyRecurrence, setDailyRecurrence] = useState([0, 1, 2, 3, 4, 5, 6])
  const [weeklyRecurrence, setWeeklyRecurrence] = useState([0, 1])
  const [monthlyRecurrence, setMonthlyRecurrence] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  const [priority, setPriority] = useState(0)
  const [category, setCategory] = useState(globalCategory)
  const [occurrence, setOccurrence] = useState(1)
  const id = uuidv4()
  const date = startOfToday()

  useEffect(() => {
    setCategory(globalCategory)
  }, [globalCategory])

  const listKey = ROUTINE_KEYS.list({ archived: false })
  const { mutate } = useMutation(createRoutine, {
    onMutate: async (data) => {
      const boardKey = ROUTINE_KEYS.board({ scheduleType: data.scheduleType, date })
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: listKey })
      await queryClient.cancelQueries({ queryKey: boardKey })

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(id), data)

      // 🗃️ Update Routine List
      const previousRoutineList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Routine[] = []) => [...old, data])

      // 🏫 Update Routine Board
      const previousBoardList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Routine[] = []) => [...old, data])
      navigate(`d/routine/${id}`)
      return { previousRoutineList, previousBoardList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(id), undefined)
      queryClient.setQueryData(listKey, context?.previousRoutineList)
      queryClient.setQueryData(
        ROUTINE_KEYS.board({ scheduleType: item.scheduleType, date }),
        context?.previousBoardList
      )
      toast.error("Creation didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(id))
      queryClient.invalidateQueries(listKey)
      queryClient.invalidateQueries(ROUTINE_KEYS.board({ scheduleType: variables.scheduleType, date }))
    },
  })

  const reset = () => {
    setName('')
    setPriority(0)
    if (category?.id !== globalCategory?.id) setGlobalCategory(null)
    setType(SCHEDULE_TYPES.daily)
    setPeriod(3)
    setOccurrence(1)
  }

  const onCreateRoutine = () => {
    if (charNum === 0) return
    mutate({
      id,
      name,
      archived: false,
      priority,
      scheduleType: currentType,
      daily_recurrence: dailyRecurrence,
      period: currentPeriod,
      weekly_recurrence: weeklyRecurrence,
      monthly_recurrence: monthlyRecurrence,
      actions: [],
      category: category,
      category_id: category?.id || null,
      created_at: new Date(),
      occurrence,
    })
    reset()
  }

  const handlePeriodChange = ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => {
    setType(scheduleType)
    setPeriod(period)
  }

  const handleRecurrenceChange = ({
    scheduleType,
    recurrenceNum,
  }: {
    scheduleType: ScheduleType
    recurrenceNum: number
  }) => {
    if (scheduleType === SCHEDULE_TYPES.daily) {
      setDailyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)
        if (index === -1) return [...prevState, recurrenceNum]
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
      })
    }

    if (scheduleType === SCHEDULE_TYPES.weekly) {
      setWeeklyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)

        if (index === -1) return [...prevState, recurrenceNum]
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
      })
    }

    if (scheduleType === SCHEDULE_TYPES.monthly) {
      setMonthlyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)
        if (index === -1) return [...prevState, recurrenceNum]
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
      })
    }
  }

  const handleNameChange = (name: string) => setName(name)

  const onSelectPriority = (priority: number) => setPriority(priority)

  const onSelectCategory = (category: Category) => setCategory(category)

  const handleOccurrenceChange = (newOccurrence: number) => setOccurrence(newOccurrence)

  return {
    currentPeriod,
    currentType,
    dailyRecurrence,
    handleNameChange,
    handlePeriodChange,
    handleRecurrenceChange,
    monthlyRecurrence,
    name,
    onCreateRoutine,
    weeklyRecurrence,
    priority,
    onSelectPriority,
    onSelectCategory,
    category,
    setCharNum,
    charNum,
    reset,
    occurrence,
    handleOccurrenceChange,
  }
}
