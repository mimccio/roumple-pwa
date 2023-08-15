import type { Status } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { cl } from '&/common/utils'
import { useUpsertAction } from '&/modules/routine/hooks'
import type { RoutineAction, Routine } from '&/modules/routine/types'
import { TodoBtn, InProgressBtn, DoneBtn } from './parts'

interface Props {
  routine: Routine
  date: Date
  action?: RoutineAction
}

export function RoutineStatusSelector({ routine, date, action }: Props) {
  const { handleUpdateStatus } = useUpsertAction({ type: routine.type, date })
  const handleSelectStatus = (status: Status) => handleUpdateStatus({ routine, status, action })

  return (
    <div className={cl('flex items-center gap-2 rounded-md transition-colors')}>
      <TodoBtn
        handleClick={() => handleSelectStatus(STATUSES.todo)}
        isSelected={action?.status === STATUSES.todo || !action?.status}
      />
      <InProgressBtn
        handleClick={() => handleSelectStatus(STATUSES.inProgress)}
        isSelected={action?.status === STATUSES.inProgress}
      />
      <DoneBtn handleClick={() => handleSelectStatus(STATUSES.done)} isSelected={action?.status === STATUSES.done} />
    </div>
  )
}
