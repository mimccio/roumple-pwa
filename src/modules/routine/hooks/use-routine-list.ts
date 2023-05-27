import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { LIST, ROUTINE } from '../constants'
import { fetchRoutines } from '../queries'
import { categoryAtom } from '&/modules/category/atoms'

export function useRoutineList() {
  const [archived, setArchived] = useState(false)
  const [category] = useAtom(categoryAtom)

  const {
    data,
    isLoading: queryIsLoading,
    error,
    isFetching,
  } = useQuery([ROUTINE, LIST, { archived, categoryId: category?.id }], fetchRoutines)

  const handleShowArchived = () => setArchived((prevState) => !prevState)

  const isError = Boolean(error)
  const isLoading = !error && queryIsLoading && isFetching
  const routines = isError ? null : data
  const isEmpty = !error && !isLoading && !routines?.length

  return { routines, isLoading, handleShowArchived, archived, isEmpty, isError }
}
