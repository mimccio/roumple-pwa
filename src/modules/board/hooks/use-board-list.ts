import { useState } from 'react'
import { useAtom } from 'jotai'

import type { ScheduleType } from '@/common/types'
import { sortItems } from '@/common/utils/list'

import { categoryAtom } from '@/modules/category/atoms'
import { useBoardTasks } from '@/modules/task/hooks'
import { useBoardRoutines, useUpsertAction } from '@/modules/routine/hooks'
import { showPeriodAtom } from '../atoms'

interface Params {
  scheduleType: ScheduleType
}

export function useBoardList({ scheduleType }: Params) {
  const [category] = useAtom(categoryAtom)
  const [showPeriod, setShowPeriod] = useAtom(showPeriodAtom)
  const [showDone, setShowDone] = useState(false)

  const handleShowDone = () => setShowDone((prevState) => !prevState)
  const handleShowPeriod = () => setShowPeriod((prevState) => !prevState)

  const { tasks, tasksShowStatus } = useBoardTasks({ scheduleType, showDone })

  const { routines, date, routinesShowStatus } = useBoardRoutines({ scheduleType, showDone })
  const { handleUpdateStatus } = useUpsertAction({ scheduleType, date })

  const routineList = routines || []
  const taskList = tasks || []

  const list = [...routineList, ...taskList].sort(sortItems)

  const showStatus = {
    loading: tasksShowStatus.loading || routinesShowStatus.loading,
    error: tasksShowStatus.error || routinesShowStatus.error,
    empty: tasksShowStatus.empty && routinesShowStatus.empty,
    offline: tasksShowStatus.offline || routinesShowStatus.offline,
    data: tasksShowStatus.data && routinesShowStatus.data,
    emptyFilteredList: Boolean(category) && routinesShowStatus.emptyFilteredList && tasksShowStatus.emptyFilteredList,
  }

  showStatus.empty =
    !list.length && !showStatus.loading && !showStatus.error && !showStatus.offline && !showStatus.emptyFilteredList
  showStatus.data = !showStatus.loading && !showStatus.error && !showStatus.offline

  return {
    showStatus,
    list,
    handleShowDone,
    showDone,
    showPeriod,
    handleShowPeriod,
    handleUpdateRoutineStatus: handleUpdateStatus,
  }
}
