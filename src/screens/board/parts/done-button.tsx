import { useState, type FormEvent } from 'react'
import { CheckIcon, ChartBarIcon } from '@heroicons/react/20/solid'

import { STATUSES } from '@/common/constants'
import { cl } from '@/common/utils'
import type { Routine, UpdateStatusParams } from '@/modules/routine/types'
import './plusOneAnimation.css'
import { getRoutineIsDone } from '@/modules/routine/utils/status'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, action, status }: UpdateStatusParams) => void
}

export function DoneButton({ handleUpdateStatus, routine }: Props) {
  const [isAnimating, setIsAnimating] = useState(false)
  const action = routine.actions?.[0]
  const isDone = getRoutineIsDone({ routine, action })
  const showPlusOne = routine.occurrence > 1 && (action?.doneOccurrence || 0) < routine.occurrence

  const getColor = () => {
    if (routine.priority === 1) return 'border-blue-500'
    if (routine.priority === 2) return 'border-orange-500'
    return 'border-gray-400'
  }

  const ringColor = getColor()

  const onClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    setIsAnimating(true)

    const status = action?.status === STATUSES.done ? STATUSES.todo : STATUSES.done
    handleUpdateStatus({ routine, action, status })
  }

  return (
    <button onClick={onClick} className="group h-8 w-8 rounded-full" onAnimationEnd={() => setIsAnimating(false)}>
      <div
        className={cl(
          'flex h-7  w-7 items-center justify-center rounded-full border-[3px] transition-colors ',
          ringColor,
          isDone ? 'bg-green-500 group-hover:bg-green-400' : 'group-hover:bg-green-100',
          !isDone && action?.status === STATUSES.inProgress && 'border-dotted group-hover:bg-green-100'
        )}
      >
        {!isDone && action?.status === STATUSES.inProgress && !showPlusOne && (
          <ChartBarIcon width={14} height={14} className="text-gray-300 transition-colors group-hover:text-gray-200" />
        )}
        {isDone && (
          <CheckIcon
            width={18}
            height={18}
            className={cl('transition-colors group-hover:text-gray-200', isDone ? 'text-white' : 'text-transparent')}
          />
        )}

        {showPlusOne && (
          <span
            // onAnimationEnd={() => setIsAnimating(false)} // no need
            className={cl(
              '  text-xs font-semibold text-green-400  group-hover:text-green-500',
              isAnimating && 'plusOneAnimation'
            )}
          >
            +1
          </span>
        )}
      </div>
    </button>
  )
}
