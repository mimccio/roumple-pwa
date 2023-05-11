import { useQuery } from '@tanstack/react-query'

import { fetchRoutines } from '../queries'

export function useRoutines() {
  const { data, isLoading } = useQuery(['ROUTINES'], fetchRoutines)

  return { routines: data, isLoading }
}
