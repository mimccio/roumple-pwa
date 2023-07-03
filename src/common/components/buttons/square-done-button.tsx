import type { FormEvent } from 'react'
import { CheckIcon, ChartBarIcon } from '@heroicons/react/20/solid'

import type { Status } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { cl, getPriorityTWBorderColor } from '&/common/utils'

interface Props {
  priority: number
  status: Status
  onUpdate: (status: Status) => void
}

export function SquareDoneButton({ onUpdate, priority, status }: Props) {
  const borderColor = getPriorityTWBorderColor(priority)

  const onClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    const newStatus = status === STATUSES.done ? STATUSES.todo : STATUSES.done
    onUpdate(newStatus)
  }

  return (
    <button onClick={onClick} className="group h-7 w-7 rounded-lg">
      <div
        className={cl(
          'flex h-6  w-6 items-center justify-center rounded-lg border-[3px] transition-colors ',
          borderColor,
          status === STATUSES.done ? 'bg-green-500 group-hover:bg-green-400' : 'group-hover:bg-green-100',
          status === STATUSES.inProgress && 'border-dotted group-hover:bg-green-100'
        )}
      >
        {status === STATUSES.inProgress ? (
          <ChartBarIcon width={14} height={14} className="text-gray-300 transition-colors group-hover:text-gray-200" />
        ) : (
          <CheckIcon
            width={18}
            height={18}
            className={cl(
              'transition-colors group-hover:text-gray-200',
              status === STATUSES.done ? 'text-white' : 'text-transparent'
            )}
          />
        )}
      </div>
    </button>
  )
}
