import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { LIST, ROUTINE } from '../constants'
import { fetchRoutines } from '../queries'

import { onlineManager } from '@tanstack/react-query'

export function useRoutineList() {
  const isConnected = onlineManager.isOnline()

  console.log('isConnected :', isConnected)

  const [archived, setArchived] = useState(false)
  const {
    data,
    isLoading: queryIsLoading,
    error,
    isFetching,
  } = useQuery([ROUTINE, LIST, { archived }], fetchRoutines, {
    enabled: isConnected ?? false,
    networkMode: 'offlineFirst',
  })

  if (error) console.log('error :', error)

  const handleShowArchived = () => setArchived((prevState) => !prevState)

  const isError = Boolean(error)
  const isLoading = !error && queryIsLoading && isFetching
  const routines = isError ? null : data
  const isEmpty = !error && !isLoading && !routines?.length

  return { routines, isLoading, handleShowArchived, archived, isEmpty, isError }
}
