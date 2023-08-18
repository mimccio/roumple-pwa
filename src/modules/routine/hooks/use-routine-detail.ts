import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { isSameDay, startOfToday } from 'date-fns'

import { ACTION_KEYS, ROUTINE_KEYS } from '../constants'
import { fetchRoutineById, fetchRoutineAction } from '../queries'
import { Routine, RoutineAction } from '../types'
import { getScheduleFormattedDate } from '../utils'

export function useRoutineDetail() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const [date, setDate] = useState(startOfToday())

  const routineQuery = useQuery(ROUTINE_KEYS.detail(routineId), fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState(ROUTINE_KEYS.list({ archived: false }))?.dataUpdatedAt,
    initialData: () => {
      const routine = queryClient.getQueryData<Routine[]>(ROUTINE_KEYS.list({ archived: false }))
      return routine?.find((item) => item.id === routineId)
    },
  })

  const scheduleType = routineQuery.data?.type

  const actionQuery = useQuery(ACTION_KEYS.detail({ routineId, date, scheduleType }), fetchRoutineAction, {
    enabled: Boolean(scheduleType),
    initialDataUpdatedAt: () =>
      routineId ? queryClient.getQueryState(ACTION_KEYS.list(routineId))?.dataUpdatedAt : undefined,
    initialData: () => {
      const actionList = routineId ? queryClient.getQueryData<RoutineAction[]>(ACTION_KEYS.list(routineId)) : []

      return actionList?.find(
        (item) =>
          item.scheduleType === scheduleType &&
          isSameDay(new Date(item.date), new Date(getScheduleFormattedDate({ scheduleType, date })))
      )
    },
  })

  return {
    date,
    handleDateChange: (date: Date) => setDate(date),
    routineQuery,
    actionQuery,
  }
}
