import { STATUSES } from '&/common/constants'
import { Status } from '&/common/types'
import { cl } from '&/common/utils'
import { useUpsertAction } from '&/modules/routine/hooks'
import type { Routine } from '&/modules/routine/types'
import { TodoBtn, InProgressBtn, DoneBtn } from './parts'

interface Props {
  routine: Routine
  date: number
}

export function StatusSelector({ routine, date }: Props) {
  const { handleUpdateStatus } = useUpsertAction({ type: routine.type, date })

  const action = routine.actions?.[0]

  const handleSelectStatus = (status: Status) => {
    handleUpdateStatus({ routine, actionId: action?.id, status })
  }

  return (
    <div
      className={cl(
        'flex items-center gap-2 rounded-md transition-colors'
        // action?.status === STATUSES.done ? 'bg-green-300 ' : 'bg-gray-200 '
      )}
    >
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
