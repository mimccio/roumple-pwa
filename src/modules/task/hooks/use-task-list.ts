import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { categoryAtom } from '&/modules/category/atoms'

import type { SortType } from '../types'
import { TASK_KEYS } from '../constants'
import { sortTypeAtom } from '../atoms'
import { sortTask } from '../utils'
import { fetchTaskList } from '../queries'
import { getShowStatus } from '&/common/utils'

export function useTaskList() {
  const [category] = useAtom(categoryAtom)
  const [sortType, setSortType] = useAtom(sortTypeAtom)
  const [showDone, setShowDone] = useState(false)
  const [createIsOpen, setCreateIsOpen] = useState(false)

  const tasksQuery = useQuery({
    queryKey: TASK_KEYS.list({ done: showDone }),
    queryFn: fetchTaskList,
  })

  const taskList = category?.id
    ? tasksQuery.data?.filter((task) => task.category?.id === category.id).sort(sortTask(sortType))
    : tasksQuery.data
    ? tasksQuery.data.sort(sortTask(sortType))
    : undefined

  const showStatus = getShowStatus(tasksQuery, taskList)
  const handleDoneChange = () => setShowDone((prevState) => !prevState)
  const handleSortChange = (newSortType: SortType) => setSortType(newSortType)
  const onOpenCreate = () => setCreateIsOpen(true)
  const onCloseCreate = () => setCreateIsOpen(false)

  return {
    taskList,
    showStatus,
    showDone,
    handleDoneChange,
    handleSortChange,
    createIsOpen,
    onOpenCreate,
    onCloseCreate,
    category,
  }
}
