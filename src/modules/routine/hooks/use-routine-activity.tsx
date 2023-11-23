import { useQuery } from '@tanstack/react-query'
import { ACTION_KEYS } from '../constants'
import { fetchActionList } from '../queries'
import { Routine } from '../types'

export function useRoutineActivity(routine: Routine) {
  const { data, isLoading, isError, isPaused } = useQuery({
    queryKey: ACTION_KEYS.list(routine.id),
    queryFn: ({ queryKey }) => fetchActionList(queryKey[2], routine.scheduleType),
    staleTime: 500,
  })

  return { actions: data, isLoading, isError, isPaused }
}
