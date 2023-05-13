import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchRoutineById } from '../queries/fetch-routine-by-id'
import { Routine } from '../types'

export function useRoutineDetails() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const options = { exact: false }

  const { data, isLoading } = useQuery(['ROUTINE', routineId], fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState(['ROUTINE'], options)?.dataUpdatedAt,
    initialData: () => {
      const cachedRoutinesData = queryClient.getQueryData<Routine[]>(['ROUTINE'], options)
      const routine = cachedRoutinesData?.find((item) => item.id === routineId)
      return routine
    },
  })

  return { routine: data, isLoading }
}
