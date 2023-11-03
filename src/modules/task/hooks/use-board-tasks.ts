import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { compareDesc, startOfToday, subMonths } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'
import { TASK_KEYS } from '../constants'
import { filterTasks } from '../utils'
import { fetchBoardTasks } from '../queries'

interface Params {
  scheduleType: ScheduleType
  showDone: boolean
}

export function useBoardTasks({ scheduleType, showDone }: Params) {
  const queryClient = useQueryClient()
  const date = startOfToday()
  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error, isPaused } = useQuery({
    queryKey: TASK_KEYS.board({ scheduleType, date }),
    queryFn: fetchBoardTasks,
  })

  // Remove old queries (older than 2 month)
  queryClient.removeQueries({
    queryKey: TASK_KEYS.boards(),
    type: 'inactive',
    predicate: (query) => {
      const queryOptions = query.queryKey[2] as { date: Date }
      return Boolean(compareDesc(new Date(queryOptions.date), subMonths(date, 2)))
    },
  })

  const tasks = data?.filter((task) => filterTasks({ task, category, showDone }))

  const tasksShowStatus = useShow({ data, isLoading, error, isPaused, filteredList: tasks })

  return { tasks, tasksShowStatus }
}
