import { useQuery } from '@tanstack/react-query'

import { ROUTINE } from '../constants'
import { fetchRoutines } from '../queries'

export function useRoutineList() {
  const { data, isLoading } = useQuery([ROUTINE], fetchRoutines)

  return { routines: data, isLoading }
}
