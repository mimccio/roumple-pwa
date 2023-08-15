import type { Status } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { useUpsertAction } from '&/modules/routine/hooks'
import type { RoutineAction, Routine } from '&/modules/routine/types'
import { TodoBtn, InProgressBtn, DoneBtn, LoadingButton } from './parts'

interface Props {
  routine: Routine
  date: Date
  action?: RoutineAction
  isLoading: boolean
}

export function RoutineStatusSelector({ routine, date, action, isLoading }: Props) {
  const { handleUpdateStatus } = useUpsertAction({ type: routine.type, date })
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
