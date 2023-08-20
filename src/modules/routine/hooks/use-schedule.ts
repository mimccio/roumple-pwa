import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { getIsScheduled } from '../utils'
import { editRoutineSchedule } from '../mutations'

interface Params {
  routine: Routine
  date: Date
}

export function useSchedule({ routine, date }: Params) {
  const queryClient = useQueryClient()
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

  const boardPrevTypeKey = ROUTINE_KEYS.board({ type: routine.type, date })
  const { mutate } = useMutation(editRoutineSchedule, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(data.id), data)

      // 🗃️ Update Routine List
      const listKey = ROUTINE_KEYS.list({ archived: data.archived })
      const previousRoutineList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Routine[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })

      // 🏫 Update Routine Board
      const isScheduled = getIsScheduled({ routine: data, date })
      const boardNewTypeKey = ROUTINE_KEYS.board({ type: data.type, date })
      const previousBoardPrevType = queryClient.getQueryData(boardPrevTypeKey)
      const previousNewPrevType = queryClient.getQueryData(boardNewTypeKey)

      // Type stays the same
      if (data.type === routine.type && !data.archived) {
        queryClient.setQueryData(boardNewTypeKey, (old: Routine[] = []) => {
          const i = old.findIndex((item) => item.id === data.id)

          if (i >= 0 && !isScheduled) return [...old.slice(0, i), ...old.slice(i + 1)]
          if (i >= 0 && isScheduled) return [...old.slice(0, i), data, ...old.slice(i + 1)]
          if (i === -1 && isScheduled) return [...old, data]
          return old
        })
      }

      // New type
      if (data.type !== routine.type && !data.archived) {
        queryClient.setQueryData(boardPrevTypeKey, (old: Routine[] = []) => {
          const i = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, i), ...old.slice(i + 1)]
        })
        queryClient.setQueryData(boardNewTypeKey, (old: Routine[] = []) => {
          if (isScheduled) return [...old, data]
          return old
        })
      }

      return { previousRoutineList, previousBoardPrevType, previousNewPrevType }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.id), routine)
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: item.archived }), context?.previousRoutineList)
      queryClient.setQueryData(boardPrevTypeKey, context?.previousBoardPrevType)
      queryClient.setQueryData(ROUTINE_KEYS.board({ type: item.type, date }), context?.previousNewPrevType)
      toast.error("Schedule modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(variables.id))
      queryClient.invalidateQueries(ROUTINE_KEYS.list({ archived: variables.archived }))
      queryClient.invalidateQueries(boardPrevTypeKey)
      queryClient.invalidateQueries(ROUTINE_KEYS.board({ type: variables.type, date }))
    },
  })

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
        let newRec = prevState

        if (index === -1) {
          newRec = [...prevState, recurrenceNum]
        } else {
          newRec = [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        }

        return newRec
      })
    }

    if (scheduleType === SCHEDULE_TYPES.weekly) {
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

    if (scheduleType === SCHEDULE_TYPES.monthly) {
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
