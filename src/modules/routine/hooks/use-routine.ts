import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { LIST, ROUTINE } from '../constants'
import { fetchRoutineById } from '../queries'
import { getTodayDate } from '&/common/utils'
import { Routine } from '../types'

export function useRoutine() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()

  const {
    data,
    isLoading: queryIsLoading,
    isPaused,
    isFetching,
  } = useQuery([ROUTINE, routineId], fetchRoutineById, {
    enabled: Boolean(routineId),
    // Not sure if initialData is working / necessary
    initialDataUpdatedAt: () => queryClient.getQueryState([ROUTINE, LIST], { exact: false })?.dataUpdatedAt,
    initialData: () => {
      const cachedRoutinesData = queryClient.getQueryData<Routine[]>([ROUTINE, LIST, { archived: false }])
      const routine = cachedRoutinesData?.find((item) => item.id === routineId)
      return routine
    },
  })

  return { routine: data, date: getTodayDate(), isLoading: queryIsLoading && isFetching, isPaused }
}
