import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import { TASK_KEYS } from '../constants'
import { fetchTaskList } from '../queries'
import { sortTask } from '../utils'
import { SortType } from '../types'
import { sortTypeAtom } from '../atoms'

export function useTaskList() {
  const [category] = useAtom(categoryAtom)
  const [sortType, setSortType] = useAtom(sortTypeAtom)
  const [showDone, setShowDone] = useState(false)
  const { data, isLoading, error, isPaused } = useQuery(TASK_KEYS.list({ done: showDone }), fetchTaskList)

  const taskList = category?.id
    ? data?.filter((task) => task.category?.id === category.id).sort(sortTask(sortType))
    : data
    ? data.sort(sortTask(sortType))
    : undefined
  const showStatus = useShow({ data, isLoading, error, isPaused })
  const handleDoneChange = () => setShowDone((prevState) => !prevState)
  const handleSortChange = (newSortType: SortType) => setSortType(newSortType)

  return { taskList, showStatus, showDone, handleDoneChange, handleSortChange }
}
