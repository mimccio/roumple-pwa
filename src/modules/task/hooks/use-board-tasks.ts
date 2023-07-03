import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { useShow } from '&/common/hooks'
import type { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { fetchBoardTasks } from '../queries'

interface Params {
  type: ScheduleType
  showDone: boolean
}

export function useBoardTasks({ type, showDone }: Params) {
  const date = startOfToday()
  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error, isPaused } = useQuery(TASK_KEYS.board({ type, date }), fetchBoardTasks)

  const filterTasks = ({ showDone, category, task }: { showDone: boolean; category: Category | null; task: Task }) => {
    if (showDone) return task.status === STATUSES.done && (category?.id ? task.category?.id === category.id : true)
    if (!showDone) {
      return task.status !== STATUSES.done && (category?.id ? task.category?.id === category.id : true)
    }
  }

  const tasks = data?.filter((task) => filterTasks({ task, category, showDone }))

  const tasksShowStatus = useShow({ data, isLoading, error, isPaused })

  return { tasks, tasksShowStatus }
}
