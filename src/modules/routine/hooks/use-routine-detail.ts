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

  // TODO: initial data

  // const routines = queryClient.getQueryData<Routine[]>(ROUTINE_KEYS.list({ archived: false }))
  // const routine = routines?.find((item) => item.id === routineId)
  // console.log('routine :', routine)

  // const boardRoutines = queryClient.getQueriesData<Routine[]>(ROUTINE_KEYS.boards())

  // const bla = boardRoutines.map((hello) => {
  //   const blou = hello[0][2] as { date: Date }
  //   if (isSameDay(new Date(blou), date))
  //   console.log('blou :', blou.date)
  //   console.log('hello[1] :', hello[1])
  //   return hello
  // })

  // console.log('boardRoutines :', boardRoutines)

  const routineQuery = useQuery(ROUTINE_KEYS.detail(routineId), fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState(ROUTINE_KEYS.list({ archived: false }))?.dataUpdatedAt,
    initialData: () => {
      const routines = queryClient.getQueryData<Routine[]>(ROUTINE_KEYS.list({ archived: false }))
      return routines?.find((item) => item.id === routineId)
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
