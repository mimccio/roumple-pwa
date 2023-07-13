import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { ROUTINE_KEYS } from '../constants'
import { fetchRoutines } from '../queries'
import { categoryAtom } from '&/modules/category/atoms'

import { useShow } from '&/common/hooks'
import { sortRoutines } from '../utils'

export function useRoutineList() {
  const [archived, setArchived] = useState(false)
  const [category] = useAtom(categoryAtom)
  const [createIsOpen, setCreateIsOpen] = useState(false)

  const { data, isLoading, error, isPaused } = useQuery(ROUTINE_KEYS.list({ archived }), fetchRoutines)

  const routineList = category?.id
    ? data?.filter((task) => task.category?.id === category.id).sort(sortRoutines)
    : data
    ? data.sort(sortRoutines)
    : []

  const showStatus = useShow({ data, isLoading, error, isPaused })
  const handleShowArchived = () => setArchived((prevState) => !prevState)
  const onOpenCreate = () => setCreateIsOpen(true)
  const onCloseCreate = () => setCreateIsOpen(false)

  return { routineList, showStatus, handleShowArchived, archived, onOpenCreate, onCloseCreate, createIsOpen }
}
