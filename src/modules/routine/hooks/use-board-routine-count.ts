import { useQuery } from '@tanstack/react-query'
import { startOfToday } from 'date-fns'

import { STATUSES } from '&/common/constants'
import type { ScheduleType } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { fetchBoardRoutines } from '../queries'

interface Params {
  type: ScheduleType
}

export function useBoardRoutineCount({ type }: Params) {
  const date = startOfToday()
  const { data, isLoading } = useQuery(ROUTINE_KEYS.board({ date, type }), fetchBoardRoutines)

  const count = data?.filter((routine) => routine.actions?.[0]?.status !== STATUSES.done).length

  return { count, isLoading }
}
