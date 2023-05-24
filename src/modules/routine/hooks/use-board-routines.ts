import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getTodayDate } from '&/common/utils'
import type { Routine, ScheduleType } from '../types'
import { BOARD, ROUTINE } from '../constants'
import { fetchBoardRoutines } from '../queries'

interface Params {
  type: ScheduleType
}

export function useBoardRoutines({ type }: Params) {
  const date = getTodayDate()
  const [showDone, setShowDone] = useState(false)

  const {
    data,
    isLoading: queryIsLoading,
    error,
    isFetching,
  } = useQuery([ROUTINE, BOARD, { date, type }], fetchBoardRoutines)

  const handleShowDone = () => setShowDone((prevState) => !prevState)

  const doneRoutines: Routine[] = []
  const todoRoutines: Routine[] = []

  data?.forEach((routine) => {
    if (routine.actions?.[0]?.done) {
      doneRoutines.push(routine)
    } else {
      todoRoutines.push(routine)
    }
  })

  const isError = Boolean(error)
  const isLoading = !error && queryIsLoading && isFetching
  const routines = isError ? null : showDone ? doneRoutines : todoRoutines
  const isEmpty = !error && !queryIsLoading && !routines?.length

  return { routines, isLoading, handleShowDone, showDone, date, isError, isEmpty }
}
