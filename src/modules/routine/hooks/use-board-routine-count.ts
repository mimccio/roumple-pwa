import { useQuery } from '@tanstack/react-query'
import { startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { ROUTINE_KEYS } from '../constants'
import { fetchBoardRoutines } from '../queries'

interface Params {
  scheduleType: ScheduleType
}

export function useBoardRoutineCount({ scheduleType }: Params) {
  const date = startOfToday()
  const { data, isLoading } = useQuery(ROUTINE_KEYS.board({ date, scheduleType }), fetchBoardRoutines)

  const count = data?.filter((routine) => routine.actions?.[0]?.status !== STATUSES.done).length

  return { count, isLoading }
}
