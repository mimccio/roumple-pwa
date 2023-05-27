import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { getTodayDate } from '&/common/utils'
import type { Routine, ScheduleType } from '../types'
import { BOARD, ROUTINE, ROUTINE_STATUSES } from '../constants'
import { fetchBoardRoutines } from '../queries'
import { categoryAtom } from '&/modules/category/atoms'

interface Params {
  type: ScheduleType
}

export function useBoardRoutines({ type }: Params) {
  const date = getTodayDate()
  const [showDone, setShowDone] = useState(false)
  const [showPeriod, setShowPeriod] = useState(true)
  const [category] = useAtom(categoryAtom)

  const { data, isLoading, error } = useQuery(
    [ROUTINE, BOARD, { date, type, categoryId: category?.id }],
    fetchBoardRoutines
  )

  const handleShowDone = () => setShowDone((prevState) => !prevState)
  const handleShowPeriod = () => setShowPeriod((prevState) => !prevState)

  const doneRoutines: Routine[] = []
  const todoRoutines: Routine[] = []

  data?.forEach((routine) => {
    if (routine.actions?.[0]?.status === ROUTINE_STATUSES.done) {
      doneRoutines.push(routine)
    } else {
      todoRoutines.push(routine)
    }
  })

  const isError = Boolean(error)
  const routines = isError ? null : showDone ? doneRoutines : todoRoutines
  const isEmpty = !error && !isLoading && !routines?.length

  return { routines, isLoading, handleShowDone, showDone, date, isError, isEmpty, showPeriod, handleShowPeriod }
}
