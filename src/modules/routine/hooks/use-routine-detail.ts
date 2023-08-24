import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import { compareAsc, isSameDay, startOfToday } from 'date-fns'

import { ACTION_KEYS, ROUTINE_KEYS } from '../constants'
import { fetchRoutineById, fetchRoutineAction } from '../queries'
import { Routine } from '../types'

export function useRoutineDetail() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const location = useLocation()

  const getSelectedDate = () => {
    const today = startOfToday()
    if (!location.state?.date) return today
    if (compareAsc(location.state.date, today) <= 0) return location.state.date
    return today
  }

  const [date, setDate] = useState(getSelectedDate())

  const getBoardAction = () => {
    let boardAction
    queryClient.getQueriesData<Routine[]>(ROUTINE_KEYS.boards()).forEach((query) => {
      const queryOptions = query[0][2] as { date: Date }
      const queryDate = queryOptions.date
      if (isSameDay(new Date(queryDate), date)) {
        const action = query[1]?.find((item) => item.id === routineId)?.actions?.[0]
        if (action) boardAction = action
      }
    })
    return boardAction
  }

  const routineQuery = useQuery(ROUTINE_KEYS.detail(routineId), fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState(ROUTINE_KEYS.list({ archived: false }))?.dataUpdatedAt,
    initialData: () => {
      const routines = queryClient.getQueryData<Routine[]>(ROUTINE_KEYS.list({ archived: false }))
      return routines?.find((item) => item.id === routineId)
    },
  })

  const scheduleType = routineQuery.data?.scheduleType

  const actionQuery = useQuery(ACTION_KEYS.detail({ routineId, date, scheduleType }), fetchRoutineAction, {
    enabled: Boolean(scheduleType),
    initialDataUpdatedAt: () =>
      routineId ? queryClient.getQueryState(ACTION_KEYS.list(routineId))?.dataUpdatedAt : undefined,
    initialData: getBoardAction,
  })

  return {
    date,
    handleDateChange: (date: Date) => setDate(date),
    routineQuery,
    actionQuery,
  }
}
