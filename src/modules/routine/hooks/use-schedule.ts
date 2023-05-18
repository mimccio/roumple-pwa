import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { sortRoutines } from '../utils'
import { editRoutineSchedule } from '../mutations'
import { useState } from 'react'

type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY'

interface Params {
  recurrence: boolean[]
  period: number
  type: ScheduleType
  id: string
}

export function useSchedule({ recurrence, period, type, id }: Params) {
  const [currentPeriod, setPeriod] = useState(period)
  const [currentRecurrence, setRecurrence] = useState(recurrence)
  const [currentType, setType] = useState(type)

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

  const handleRecurrenceChange = (index: number) => {
    setRecurrence((prevState) => {
      const newRecurrence = [...prevState.slice(0, index), !prevState[index], ...prevState.slice(index + 1)]
      mutate({ id, recurrence: currentRecurrence, type: currentType, period: currentPeriod })
      return newRecurrence
    })
  }

  const handlePeriodChange = ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => {
    setType(scheduleType)
    setPeriod(period)
    mutate({ id, recurrence: currentRecurrence, type: scheduleType, period })
  }

  return { currentRecurrence, currentPeriod, handlePeriodChange, currentType, handleRecurrenceChange }
}
