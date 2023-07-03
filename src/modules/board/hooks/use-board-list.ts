import { useState } from 'react'

import type { ScheduleType } from '&/common/types'
import { sortItems } from '&/common/utils/list'

import { useBoardTasks } from '&/modules/task/hooks'
import { useBoardRoutines, useUpsertAction } from '&/modules/routine/hooks'

interface Params {
  type: ScheduleType
}

export function useBoardList({ type }: Params) {
  const [showDone, setShowDone] = useState(false)
  const [showPeriod, setShowPeriod] = useState(true)

  const handleShowDone = () => setShowDone((prevState) => !prevState)
  const handleShowPeriod = () => setShowPeriod((prevState) => !prevState)

  const { tasks, tasksShowStatus } = useBoardTasks({ type, showDone })

  const { routines, date, routinesShowStatus } = useBoardRoutines({ type, showDone })
  const { handleUpdateStatus } = useUpsertAction({ type, date })

  const routineList = routines || []
  const taskList = tasks || []

  const list = [...routineList, ...taskList].sort(sortItems)

  const showStatus = {
    loading: tasksShowStatus.loading || routinesShowStatus.loading,
    error: tasksShowStatus.error || routinesShowStatus.error,
    empty: tasksShowStatus.empty && routinesShowStatus.empty,
    offline: tasksShowStatus.offline || routinesShowStatus.offline,
  }

  showStatus.empty = !list.length && !showStatus.loading && !showStatus.error && !showStatus.offline

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
