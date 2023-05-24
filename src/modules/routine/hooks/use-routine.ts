import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import type { Routine } from '../types'
import { LIST, ROUTINE } from '../constants'
import { fetchRoutineById } from '../queries'
import { getTodayDate } from '&/common/utils'

export function useRoutine() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const options = { exact: false }

  const { data, isLoading, isFetching, isPaused } = useQuery([ROUTINE, routineId], fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState([ROUTINE], options)?.dataUpdatedAt,
    initialData: () => {
      const cachedRoutinesData = queryClient.getQueryData<Routine[]>([ROUTINE, LIST], options)
      const routine = cachedRoutinesData?.find((item) => item.id === routineId)
      return routine
    },
  })

  return { routine: data, date: getTodayDate(), isLoading: isLoading && isFetching, isPaused }
}
