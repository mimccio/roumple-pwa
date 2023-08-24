import type { Status } from '&/common/types'
import { SCHEDULE_TYPES, STATUSES } from '&/common/constants'
import { useUpsertAction } from '&/modules/routine/hooks'
import type { RoutineAction, Routine } from '&/modules/routine/types'
import { TodoBtn, InProgressBtn, DoneBtn, LoadingButton } from './parts'
import { startOfMonth, startOfWeek } from 'date-fns'

interface Props {
  routine: Routine
  date: Date
  action?: RoutineAction
  isLoading: boolean
}

export function RoutineStatusSelector({ routine, date: dayDate, action, isLoading }: Props) {
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

  if (isLoading) {
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
        isSelected={action?.status === STATUSES.todo || !action?.status}
      />
      <InProgressBtn
        handleClick={() => handleSelectStatus(STATUSES.inProgress)}
        isSelected={action?.status === STATUSES.inProgress}
      />
      <DoneBtn
        showCheck={showCheck}
        handleClick={() => handleSelectStatus(STATUSES.done)}
        isSelected={action?.status === STATUSES.done}
      />
    </div>
  )
}
