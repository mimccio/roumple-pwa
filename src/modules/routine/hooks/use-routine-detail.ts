import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { startOfToday } from 'date-fns'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { fetchRoutineById } from '../queries'

export function useDetailRoutine() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()

  const {
    data,
    isLoading: queryIsLoading,
    isPaused,
    isFetching,
  } = useQuery(ROUTINE_KEYS.detail(routineId), fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState(ROUTINE_KEYS.list({ archived: false }))?.dataUpdatedAt,
    initialData: () => {
      const cachedRoutinesData = queryClient.getQueryData<Routine[]>(ROUTINE_KEYS.list({ archived: false }))
      const routine = cachedRoutinesData?.find((item) => item.id === routineId)
      return routine
    },
  })

  return { routine: data, date: startOfToday(), isLoading: queryIsLoading && isFetching, isPaused }
}
