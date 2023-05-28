import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { LIST, ROUTINE } from '../constants'
import { fetchRoutines } from '../queries'
import { categoryAtom } from '&/modules/category/atoms'
import { Routine } from '../types'

export function useRoutineList() {
  const [archived, setArchived] = useState(false)
  const [category] = useAtom(categoryAtom)
  const [routines, setRoutines] = useState<Routine[]>()

  const { data, isLoading: queryIsLoading, error, isFetching } = useQuery([ROUTINE, LIST, { archived }], fetchRoutines)

  useEffect(() => {
    if (category && data) {
      setRoutines(
        data?.filter((routine) => routine.category_id === category.id || routine.category?.id === category.id)
      )
    } else {
      setRoutines(data)
    }
  }, [data, category])

  const handleShowArchived = () => setArchived((prevState) => !prevState)

  const isError = Boolean(error)
  const isLoading = !error && queryIsLoading && isFetching
  const isEmpty = !error && !isLoading && !routines?.length

  return { routines, isLoading, handleShowArchived, archived, isEmpty, isError }
}
