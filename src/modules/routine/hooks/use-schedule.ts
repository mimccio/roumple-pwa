import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine, ScheduleType } from '../types'
import { BOARD, DAILY, LIST, MONTHLY, ROUTINE, WEEKLY } from '../constants'
import { getIsScheduled, sortRoutines } from '../utils'
import { editRoutineSchedule } from '../mutations'

interface Params {
  routine: Routine
  date: number
}

export function useSchedule({ routine, date }: Params) {
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

      // Details
      queryClient.setQueryData([ROUTINE, data.id], () => data)

      // List
      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: data.archived }])
      queryClient.setQueryData([ROUTINE, LIST, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)]
      })

      // Board
      const previousBoardRoutines = queryClient.getQueryData([ROUTINE, BOARD, { type: routine.type, date }])

      const isScheduled = getIsScheduled({ data, date })

      // Type stays the same
      if (data.type === routine.type && !data.archived) {
        queryClient.setQueryData([ROUTINE, BOARD, { type: data.type, date }], (old: Routine[] = []) => {
          const routineIndex = old.findIndex((item) => item.id === data.id)

          if (routineIndex >= 0 && !isScheduled) return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
          if (routineIndex >= 0 && isScheduled)
            return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)]
          if (routineIndex === -1 && isScheduled) return [...old, data].sort(sortRoutines)
          return old
        })
      }

      // New type
      if (data.type !== routine.type && !data.archived) {
        queryClient.setQueryData([ROUTINE, BOARD, { type: routine.type, date }], (old: Routine[] = []) => {
          const routineIndex = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
        })

        queryClient.setQueryData([ROUTINE, BOARD, { type: data.type, date }], (old: Routine[] = []) => {
          if (isScheduled) return [...old, data].sort(sortRoutines)
          return old
        })
      }

      return { previousRoutineList, previousBoardRoutines }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, routine.id], routine)
      queryClient.setQueryData([ROUTINE, LIST, { archived: item.archived }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { type: item.type, date }], context?.previousBoardRoutines)
      toast.error("Schedule modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: variables.archived }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: routine.type, date }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: variables.type, date }])
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

        return newMonthRec
      })
    }
  }

  const handlePeriodChange = ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => {
    setType(scheduleType)
    setPeriod(period)
  }

  const onSubmit = () =>
    mutate({
      ...routine,
      daily_recurrence: dailyRecurrence,
      type: currentType,
      period: currentPeriod,
      weekly_recurrence: weeklyRecurrence,
      monthly_recurrence: monthlyRecurrence,
    })

  return {
    dailyRecurrence,
    currentPeriod,
    handlePeriodChange,
    currentType,
    handleRecurrenceChange,
    weeklyRecurrence,
    monthlyRecurrence,
    onSubmit,
  }
}
