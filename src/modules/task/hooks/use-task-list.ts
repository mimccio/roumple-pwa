import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { fetchTaskList } from '../queries'

export function useTaskList() {
  const [category] = useAtom(categoryAtom)
  const [taskList, setTaskList] = useState<Task[]>()

  const { data, isLoading, error, isPaused } = useQuery(TASK_KEYS.list(), fetchTaskList)

  useEffect(() => {
    if (category && data) {
      setTaskList(data?.filter((task) => task.category?.id === category.id))
    } else {
      setTaskList(data)
    }
  }, [data, category])

  const showStatus = useShow({ data, isLoading, error, isPaused })

  return { taskList, showStatus }
}
