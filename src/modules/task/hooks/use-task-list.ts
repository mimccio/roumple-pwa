import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import type { SortType } from '../types'
import { TASK_KEYS } from '../constants'
import { sortTypeAtom } from '../atoms'
import { sortTask } from '../utils'
import { fetchTaskList } from '../queries'

export function useTaskList() {
  const [category] = useAtom(categoryAtom)
  const [sortType, setSortType] = useAtom(sortTypeAtom)
  const [showDone, setShowDone] = useState(false)
  const [createIsOpen, setCreateIsOpen] = useState(false)

  const { data, isLoading, error, isPaused } = useQuery(TASK_KEYS.list({ done: showDone }), fetchTaskList)

  const taskList = category?.id
    ? data?.filter((task) => task.category?.id === category.id).sort(sortTask(sortType))
    : data
    ? data.sort(sortTask(sortType))
    : undefined

  const showStatus = useShow({ data, isLoading, error, isPaused, filteredList: taskList })
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
