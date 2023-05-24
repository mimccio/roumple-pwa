import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { ROUTINE } from '../constants'
import { fetchRoutineById } from '../queries'
import { getTodayDate } from '&/common/utils'

export function useRoutine() {
  const { routineId } = useParams()

  const { data, isLoading, isFetching, isPaused } = useQuery([ROUTINE, routineId], fetchRoutineById, {
    enabled: Boolean(routineId),
  })

  return { routine: data, date: getTodayDate(), isLoading: isLoading && isFetching, isPaused }
}
