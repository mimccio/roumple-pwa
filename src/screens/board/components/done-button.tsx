import { cl } from '&/common/utils'
import { ROUTINE_STATUSES } from '&/modules/routine/constants'
import { Routine, UpdateStatusParams } from '&/modules/routine/types'
import { CheckIcon, ChartBarIcon } from '@heroicons/react/20/solid'
import { FormEvent } from 'react'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, actionId, status }: UpdateStatusParams) => void
}

export function DoneButton({ handleUpdateStatus, routine }: Props) {
  const action = routine.actions?.[0]

  const getColor = () => {
    if (routine.priority === 1) return 'border-blue-500 hover:border-blue-400'
    if (routine.priority === 2) return 'border-orange-500 hover:border-orange-400'
    return 'border-gray-400 hover:border-gray-300'
  }

  const ringColor = getColor()

  const onClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    const status = action?.status === ROUTINE_STATUSES.done ? ROUTINE_STATUSES.todo : ROUTINE_STATUSES.done
    handleUpdateStatus({ routine, actionId: action?.id, status })
  }

  return (
    <button onClick={onClick} className="group h-8 w-8  rounded-full">
      <div
        className={cl(
          'flex h-7  w-7 items-center justify-center rounded-full border-[3px] transition-colors group-hover:bg-green-100',
          ringColor,
          action?.status === ROUTINE_STATUSES.done && 'bg-green-500',
          action?.status === ROUTINE_STATUSES.inProgress && 'border-dotted'
        )}
      >
        {action?.status === ROUTINE_STATUSES.inProgress ? (
          <ChartBarIcon width={14} height={14} className="text-gray-300 transition-colors group-hover:text-gray-200" />
        ) : (
          <CheckIcon
            width={18}
            height={18}
            className={cl(
              'transition-colors group-hover:text-gray-200',
              action?.status === ROUTINE_STATUSES.done ? 'text-white' : 'text-transparent'
            )}
          />
        )}
      </div>
    </button>
  )
}
