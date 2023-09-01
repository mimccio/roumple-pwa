import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import type { Routine, SortType } from '../types'
import { routineGroupByScheduleAtom, routineSortTypeAtom } from '../atoms'
import { sortRoutines } from '../utils'
import { ROUTINE_KEYS } from '../constants'
import { fetchRoutines } from '../queries'

export function useRoutineList() {
  const [category] = useAtom(categoryAtom)
  const [sortType, setSortType] = useAtom(routineSortTypeAtom)
  const [isGroupedBySchedule, setIsGroupedBySchedule] = useAtom(routineGroupByScheduleAtom)
  const [archived, setArchived] = useState(false)
  const [createIsOpen, setCreateIsOpen] = useState(false)

  const { data, isLoading, error, isPaused } = useQuery(ROUTINE_KEYS.list({ archived }), fetchRoutines)

  const routineList: Routine[] = category?.id
    ? data?.filter((task) => task.category?.id === category.id).sort(sortRoutines(sortType)) || []
    : data
    ? data.sort(sortRoutines(sortType))
    : []

  const showStatus = useShow({ data, isLoading, error, isPaused, filteredList: routineList })
  const handleShowArchived = () => setArchived((prevState) => !prevState)
  const onOpenCreate = () => setCreateIsOpen(true)
  const onCloseCreate = () => setCreateIsOpen(false)
  const handleSortChange = (newSortType: SortType) => setSortType(newSortType)
  const handleGroupBySchedule = () => setIsGroupedBySchedule(!isGroupedBySchedule)

  return {
    archived,
    createIsOpen,
    handleGroupBySchedule,
    handleShowArchived,
    handleSortChange,
    onCloseCreate,
    onOpenCreate,
    routineList,
    showStatus,
    isGroupedBySchedule,
    category,
  }
}
