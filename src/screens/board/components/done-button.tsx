import type { FormEvent } from 'react'
import { CheckIcon, ChartBarIcon } from '@heroicons/react/20/solid'

import { STATUSES } from '&/common/constants'
import { cl } from '&/common/utils'
import type { Routine, UpdateStatusParams } from '&/modules/routine/types'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, actionId, status }: UpdateStatusParams) => void
}

export function DoneButton({ handleUpdateStatus, routine }: Props) {
  const action = routine.actions?.[0]

  const getColor = () => {
    if (routine.priority === 1) return 'border-blue-500'
    if (routine.priority === 2) return 'border-orange-500'
    return 'border-gray-400'
  }

  const ringColor = getColor()

  const onClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    const status = action?.status === STATUSES.done ? STATUSES.todo : STATUSES.done
    handleUpdateStatus({ routine, actionId: action?.id, status })
  }

  return (
    <button onClick={onClick} className="group h-8 w-8 rounded-full">
      <div
        className={cl(
          'flex h-7  w-7 items-center justify-center rounded-full border-[3px] transition-colors ',
          ringColor,
          action?.status === STATUSES.done ? 'bg-green-500 group-hover:bg-green-400' : 'group-hover:bg-green-100',
          action?.status === STATUSES.inProgress && 'border-dotted group-hover:bg-green-100'
        )}
      >
        {action?.status === STATUSES.inProgress ? (
          <ChartBarIcon width={14} height={14} className="text-gray-300 transition-colors group-hover:text-gray-200" />
        ) : (
          <CheckIcon
            width={18}
            height={18}
            className={cl(
              'transition-colors group-hover:text-gray-200',
              action?.status === STATUSES.done ? 'text-white' : 'text-transparent'
            )}
          />
        )}
      </div>
    </button>
  )
}
