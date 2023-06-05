import { useQuery } from '@tanstack/react-query'

import { STATUSES } from '&/common/constants'
import { getTodayDate } from '&/common/utils'

import type { ScheduleType } from '../types'
import { BOARD, ROUTINE } from '../constants'
import { fetchBoardRoutines } from '../queries'

interface Params {
  type: ScheduleType
}

export function useBoardRoutineCount({ type }: Params) {
  const date = getTodayDate()
  const { data, isLoading } = useQuery([ROUTINE, BOARD, { date, type }], fetchBoardRoutines)

  const count = data?.filter((routine) => routine.actions?.[0]?.status !== STATUSES.done).length

  return { count, isLoading }
}
