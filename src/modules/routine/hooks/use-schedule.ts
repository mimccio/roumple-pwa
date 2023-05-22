import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine, ScheduleType } from '../types'
import { DAILY, MONTHLY, ROUTINE, WEEKLY } from '../constants'
import { editRoutineSchedule } from '../mutations'
import { useState } from 'react'

export function useSchedule(routine: Routine) {
  const [currentType, setType] = useState(routine.type)
  const [currentPeriod, setPeriod] = useState(routine.period)
  const [dailyRecurrence, setDailyRecurrence] = useState(routine.daily_recurrence)
  const [weeklyRecurrence, setWeeklyRecurrence] = useState(routine.weekly_recurrence)
  const [monthlyRecurrence, setMonthlyRecurrence] = useState(routine.monthly_recurrence)

  useEffect(() => {
    setType(routine.type)
    setDailyRecurrence(routine.daily_recurrence)
    setWeeklyRecurrence(routine.weekly_recurrence)
    setMonthlyRecurrence(routine.monthly_recurrence)
  }, [routine])

  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutineSchedule, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      queryClient.setQueryData([ROUTINE, data.id], () => data)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, { archived: data.archived }])
      queryClient.setQueryData([ROUTINE, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)]
      })

      return { previousRoutineList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE, routine.id], routine)
      queryClient.setQueryData([ROUTINE], context?.previousRoutineList)
      toast.error("Schedule modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTINE], { exact: false })
    },
  })

  const handleRecurrenceChange = ({
    scheduleType,
    recurrenceNum,
  }: {
    scheduleType: ScheduleType
    recurrenceNum: number
  }) => {
    if (scheduleType === DAILY) {
      setDailyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)
        let newRec = prevState

        if (index === -1) {
          newRec = [...prevState, recurrenceNum]
        } else {
          newRec = [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        }
        mutate({
          ...routine,
          daily_recurrence: newRec,
          type: currentType,
          period: currentPeriod,
          weekly_recurrence: weeklyRecurrence,
          monthly_recurrence: monthlyRecurrence,
        })

        return newRec
      })
    }

    if (scheduleType === WEEKLY) {
      setWeeklyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)
        let newWeekRec = prevState

        if (index === -1) {
          newWeekRec = [...prevState, recurrenceNum]
        } else {
          newWeekRec = [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        }
        mutate({
          ...routine,
          daily_recurrence: dailyRecurrence,
          type: currentType,
          period: currentPeriod,
          weekly_recurrence: newWeekRec,
          monthly_recurrence: monthlyRecurrence,
        })
        return newWeekRec
      })
    }

    if (scheduleType === MONTHLY) {
      setMonthlyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)
        let newMonthRec = prevState

        if (index === -1) {
          newMonthRec = [...prevState, recurrenceNum]
        } else {
          newMonthRec = [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        }
        mutate({
          ...routine,
          daily_recurrence: dailyRecurrence,
          type: currentType,
          period: currentPeriod,
          weekly_recurrence: weeklyRecurrence,
          monthly_recurrence: newMonthRec,
        })

        return newMonthRec
      })
    }
  }

  const handlePeriodChange = ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => {
    setType(scheduleType)
    setPeriod(period)
    mutate({
      ...routine,
      daily_recurrence: dailyRecurrence,
      type: scheduleType,
      period,
      weekly_recurrence: weeklyRecurrence,
      monthly_recurrence: monthlyRecurrence,
    })
  }

  return {
    dailyRecurrence,
    currentPeriod,
    handlePeriodChange,
    currentType,
    handleRecurrenceChange,
    weeklyRecurrence,
    monthlyRecurrence,
  }
}
