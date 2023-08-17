import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { startOfToday } from 'date-fns'

import { ACTION_KEYS, ROUTINE_KEYS } from '../constants'
import { fetchRoutineById, fetchRoutineAction } from '../queries'

export function useRoutineDetail() {
  const { routineId } = useParams()
  const [date, setDate] = useState(startOfToday())

  // TODO?: initial data

  const routineQuery = useQuery(ROUTINE_KEYS.detail(routineId), fetchRoutineById, {
    enabled: Boolean(routineId),
  })

  const actionQuery = useQuery(ACTION_KEYS.detail({ routineId, date }), fetchRoutineAction)

  return {
    date,
    handleDateChange: (date: Date) => setDate(date),
    routineQuery,
    actionQuery,
  }
}
