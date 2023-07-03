import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import type { ScheduleType } from '&/common/types'
import { getTodayDate } from '&/common/utils'

import { BOARD, ROUTINE } from '../constants'
import { fetchBoardRoutines } from '../queries'
import { categoryAtom } from '&/modules/category/atoms'
import { filterRoutines } from '../utils'
import { useShow } from '&/common/hooks'

interface Params {
  type: ScheduleType
  showDone: boolean
}

export function useBoardRoutines({ type, showDone }: Params) {
  const date = getTodayDate()
  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error, isPaused } = useQuery([ROUTINE, BOARD, { date, type }], fetchBoardRoutines)

  const routines = data?.filter((routine) => filterRoutines({ routine, category, showDone }))

  const routinesShowStatus = useShow({ data, isLoading, error, isPaused })

  return { routines, date, routinesShowStatus }
}
