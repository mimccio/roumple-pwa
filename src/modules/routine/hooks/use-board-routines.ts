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

  const { data, isLoading } = useQuery([ROUTINE, BOARD, { date, type }], fetchBoardRoutines)

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

  const routines = showDone ? doneRoutines : todoRoutines

  return { routines, isLoading, handleShowDone, showDone, date }
}
