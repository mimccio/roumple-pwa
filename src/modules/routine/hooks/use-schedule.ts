import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { DAILY, ROUTINE, WEEKLY } from '../constants'
import { sortRoutines } from '../utils'
import { editRoutineSchedule } from '../mutations'
import { useState } from 'react'

type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export function useSchedule({
  daily_recurrence,
  weekly_recurrence,
  period,
  type,
  id,
}: Pick<Routine, 'weekly_recurrence' | 'daily_recurrence' | 'period' | 'type' | 'id'>) {
  const [currentType, setType] = useState(type)
  const [currentPeriod, setPeriod] = useState(period)
  const [dailyRecurrence, setDailyRecurrence] = useState(daily_recurrence)
  const [weeklyRecurrence, setWeeklyRecurrence] = useState(weekly_recurrence)

  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutineSchedule, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      queryClient.setQueryData([ROUTINE, data.id], (old?: Routine) => old && { ...old, ...data })
      const previousRoutineList = queryClient.getQueryData([ROUTINE])

      queryClient.setQueryData([ROUTINE], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)].sort(
          sortRoutines
        )
      })

      return { previousRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE], context?.previousRoutineList)
      toast.error("Schedule modification didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries([ROUTINE])
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
        }
        newRec = [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        mutate({
          id,
          daily_recurrence: newRec,
          type: currentType,
          period: currentPeriod,
          weekly_recurrence: weeklyRecurrence,
        })
        return newRec
      })
    }

    if (scheduleType === WEEKLY) {
      setWeeklyRecurrence((prevState) => {
        const index = prevState.findIndex((item) => item === recurrenceNum)
        let newWeekRec = prevState
        console.log('---newWeekRec :', newWeekRec)

        if (index === -1) {
          newWeekRec = [...prevState, recurrenceNum]
        }
        newWeekRec = [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        mutate({
          id,
          daily_recurrence: dailyRecurrence,
          type: currentType,
          period: currentPeriod,
          weekly_recurrence: newWeekRec,
        })
        console.log('newWeekRec :', newWeekRec)
        return newWeekRec
      })
    }
  }

  const handlePeriodChange = ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => {
    setType(scheduleType)
    setPeriod(period)
    mutate({ id, daily_recurrence: dailyRecurrence, type: scheduleType, period, weekly_recurrence: weeklyRecurrence })
  }

  return { dailyRecurrence, currentPeriod, handlePeriodChange, currentType, handleRecurrenceChange, weeklyRecurrence }
}
