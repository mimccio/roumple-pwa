import { cl } from '&/common/utils'
import { Routine, UpdateStatusParams } from '&/modules/routine/types'
import { CheckIcon } from '@heroicons/react/20/solid'
import { FormEvent } from 'react'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, actionId, done }: UpdateStatusParams) => void
}

export function DoneButton({ handleUpdateStatus, routine }: Props) {
  const action = routine.actions?.[0]

  const getColor = () => {
    if (routine.priority === 1) return 'border-blue-500 hover:border-blue-400'
    if (routine.priority === 2) return 'border-orange-500 hover:border-orange-400'
    return 'border-gray-400 hover:border-gray-300'
  }

  const isDone = action?.done || false

  const ringColor = getColor()

  const onClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    handleUpdateStatus({ routine, actionId: action?.id, done: !isDone })
  }

  return (
    <button onClick={onClick} className="group h-8 w-8  rounded-full">
      <div
        className={cl(
          'flex h-7  w-7 items-center justify-center rounded-full border-[3px] transition-colors',
          ringColor
        )}
      >
        {isDone && (
          <CheckIcon width={18} height={18} className="text-lime-500 transition-colors group-hover:text-lime-300" />
        )}
      </div>
    </button>
  )
}
