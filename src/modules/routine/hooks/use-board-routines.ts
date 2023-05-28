import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { getTodayDate } from '&/common/utils'
import type { ScheduleType } from '../types'
import { BOARD, ROUTINE } from '../constants'
import { fetchBoardRoutines } from '../queries'
import { categoryAtom } from '&/modules/category/atoms'
import { filterRoutines } from '../utils'

interface Params {
  type: ScheduleType
}

export function useBoardRoutines({ type }: Params) {
  const date = getTodayDate()
  const [showDone, setShowDone] = useState(false)
  const [showPeriod, setShowPeriod] = useState(true)
  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error } = useQuery([ROUTINE, BOARD, { date, type }], fetchBoardRoutines)

  const handleShowDone = () => setShowDone((prevState) => !prevState)
  const handleShowPeriod = () => setShowPeriod((prevState) => !prevState)
  const isError = Boolean(error)
  const routines = data?.filter((routine) => filterRoutines({ routine, category, showDone }))
  const isEmpty = !error && !isLoading && !routines?.length

  return { routines, isLoading, handleShowDone, showDone, date, isError, isEmpty, showPeriod, handleShowPeriod }
}
