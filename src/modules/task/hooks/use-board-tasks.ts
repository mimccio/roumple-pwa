import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'
import { TASK_KEYS } from '../constants'
import { filterTasks } from '../utils'
import { fetchBoardTasks } from '../queries'

interface Params {
  type: ScheduleType
  showDone: boolean
}

export function useBoardTasks({ type, showDone }: Params) {
  const date = startOfToday()
  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error, isPaused } = useQuery(TASK_KEYS.board({ type, date }), fetchBoardTasks)

  const tasks = data?.filter((task) => filterTasks({ task, category, showDone }))

  const tasksShowStatus = useShow({ data, isLoading, error, isPaused })

  return { tasks, tasksShowStatus }
}
