import { useQuery } from '@tanstack/react-query'

import { fetchRoutines } from '../queries'

export function useRoutines() {
  const { data, isLoading } = useQuery(['ROUTINE'], fetchRoutines)

  return { routines: data, isLoading }
}
