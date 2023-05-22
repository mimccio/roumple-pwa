import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { LIST, ROUTINE } from '../constants'
import { fetchRoutines } from '../queries'

export function useRoutineList() {
  const [archived, setArchived] = useState(false)
  const { data, isLoading } = useQuery([ROUTINE, LIST, { archived }], fetchRoutines)

  const handleShowArchived = () => setArchived((prevState) => !prevState)

  return { routines: data, isLoading, handleShowArchived, archived }
}
