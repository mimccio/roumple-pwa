import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import { TASK_KEYS } from '../constants'
import { filterTasks } from '../utils'
import { fetchTaskList } from '../queries'

export function useTaskList() {
  const [category] = useAtom(categoryAtom)
  const [showDone, setShowDone] = useState(false)
  const { data, isLoading, error, isPaused } = useQuery(TASK_KEYS.list(), fetchTaskList)
  const taskList = data?.filter((task) => filterTasks({ task, category, showDone }))
  const showStatus = useShow({ data, isLoading, error, isPaused })
  const handleDoneChange = () => setShowDone((prevState) => !prevState)
  return { taskList, showStatus, showDone, handleDoneChange }
}
