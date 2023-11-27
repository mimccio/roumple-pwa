import type { UseQueryResult } from '@tanstack/react-query'
import { startOfMonth, startOfWeek } from 'date-fns'

import type { Status } from '@/common/types'
import { SCHEDULE_TYPES, STATUSES } from '@/common/constants'
import { TodoBtn, InProgressBtn, DoneBtn, LoadingButton } from '@/common/components/buttons/status'

import type { RoutineAction, Routine } from '@/modules/routine/types'
import { useUpsertAction } from '@/modules/routine/hooks'
import { getRoutineIsDone } from '@/modules/routine/utils/status'

interface Props {
  routine: Routine
  date: Date
  actionQuery: UseQueryResult<RoutineAction | undefined, unknown>
}

export function RoutineStatusSelector({ routine, date: dayDate, actionQuery }: Props) {
  const action = actionQuery.data
  const getDate = () => {
    let date = dayDate
    if (routine.scheduleType === SCHEDULE_TYPES.monthly) date = startOfMonth(date)
    if (routine.scheduleType === SCHEDULE_TYPES.weekly) date = startOfWeek(date, { weekStartsOn: 1 })
    return date
  }
  const date = getDate()
  const { handleUpdateStatus } = useUpsertAction({ scheduleType: routine.scheduleType, date })
  const handleSelectStatus = (status: Status) => handleUpdateStatus({ routine, status, action })
  const showCheck = routine.occurrence <= 1 || routine.occurrence - (action?.doneOccurrence || 0) <= 1
  const isDone = getRoutineIsDone({ routine, action })

  if (actionQuery.isLoading && !actionQuery.isPaused) {
    return (
      <div className="flex items-center gap-2">
        <LoadingButton />
        <LoadingButton />
        <LoadingButton />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <TodoBtn
        handleClick={() => handleSelectStatus(STATUSES.todo)}
        isSelected={(!isDone && action?.status === STATUSES.todo) || !action?.status}
      />
      <InProgressBtn
        handleClick={() => handleSelectStatus(STATUSES.inProgress)}
        isSelected={!isDone && action?.status === STATUSES.inProgress}
      />
      <DoneBtn showCheck={showCheck} handleClick={() => handleSelectStatus(STATUSES.done)} isSelected={isDone} />
    </div>
  )
}
