import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { BoardType, Routine, ScheduleType } from '../types'
import { ROUTINE } from '../constants'
import { fetchBoardRoutines } from '../queries'

interface Params {
  boardType: BoardType
  type: ScheduleType
}

const date = new Date()

export function useBoardRoutines({ boardType, type }: Params) {
  const [showDone, setShowDone] = useState(false)

  const { data, isLoading } = useQuery([ROUTINE, boardType, { date, type }], fetchBoardRoutines)

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

  return { routines, isLoading, handleShowDone, date, showDone }
}
