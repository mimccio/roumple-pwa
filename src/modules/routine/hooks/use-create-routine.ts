import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'

import { createRoutine } from '../mutations'
import { Routine, ScheduleType } from '../types'
import { BOARD, LIST, ROUTINE, SCHEDULE_TYPES } from '../constants'
import { categoryAtom } from '&/modules/category/atoms'
import { getTodayDate } from '&/common/utils'
import { useState } from 'react'
import { Category } from '&/modules/category/types'

export function useCreateRoutine() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()
  const [globalCategory] = useAtom(categoryAtom)
  const date = getTodayDate()
  const [name, setName] = useState('')
  const [charNum, setCharNum] = useState(0)
  const [currentType, setType] = useState<ScheduleType>(SCHEDULE_TYPES.daily)
  const [currentPeriod, setPeriod] = useState(3)
  const [dailyRecurrence, setDailyRecurrence] = useState([0, 1, 2, 3, 4, 5, 6])
  const [weeklyRecurrence, setWeeklyRecurrence] = useState([0, 1])
  const [monthlyRecurrence, setMonthlyRecurrence] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  const [priority, setPriority] = useState(0)
  const [category, setCategory] = useState(globalCategory)

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

  const { mutate } = useMutation(createRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, LIST, { archived: false }] })
      queryClient.setQueryData([ROUTINE, id], () => data)
      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: false }])
      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], (old: Routine[] = []) => [...old, data])
      const previousBoardList = queryClient.getQueryData([
        ROUTINE,
        BOARD,
        { type: SCHEDULE_TYPES.daily, date: getTodayDate() },
      ])
      queryClient.setQueryData([ROUTINE, BOARD, { type: SCHEDULE_TYPES.daily, date }], (old: Routine[] = []) => [
        ...old,
        data,
      ])
      navigate(`d/routine/${id}`)
      return { previousRoutineList, previousBoardList }
    },
    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { type: SCHEDULE_TYPES.daily, date }], context?.previousBoardList)
      toast.error("Creation didn't work")
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([ROUTINE, data.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: false }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: SCHEDULE_TYPES.daily, dated: false }])
    },
  })

  const onCreateRoutine = () => {
    if (charNum === 0) return

    mutate({
      id,
      name,
      archived: false,
      priority,
      type: currentType,
      daily_recurrence: dailyRecurrence,
      period: currentPeriod,
      weekly_recurrence: weeklyRecurrence,
      monthly_recurrence: monthlyRecurrence,
      actions: [],
      category: category,
      category_id: category?.id || null,
      created_at: new Date(),
    })
  }

  const handleNameChange = (name: string) => setName(name)

  const onSelectPriority = (priority: number) => setPriority(priority)

  const onSelectCategory = (category: Category) => setCategory(category)

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
  }
}
