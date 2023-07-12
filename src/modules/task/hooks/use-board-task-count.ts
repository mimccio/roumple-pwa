import { useQuery } from '@tanstack/react-query'
import { startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { TASK_KEYS } from '../constants'
import { fetchBoardTasks } from '../queries'

interface Params {
  type: ScheduleType
}

export function useBoardTaskCount({ type }: Params) {
  const date = startOfToday()

  const { data, isLoading } = useQuery(TASK_KEYS.board({ type, date }), fetchBoardTasks)

  const count = data?.filter((task) => task.status !== STATUSES.done).length

  return { count, isLoading }
}
