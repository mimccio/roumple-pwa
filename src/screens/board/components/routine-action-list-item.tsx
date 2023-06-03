import { NavLink } from 'react-router-dom'
import { cl } from '&/common/utils'
import { Routine, UpdateStatusParams } from '&/modules/routine/types'
import { DoneButton } from './done-button'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, actionId, status }: UpdateStatusParams) => void
}

export function RoutineActionListItem({ routine, handleUpdateStatus }: Props) {
  return (
    <NavLink
      to={`d/routine/${routine.id}`}
      className={({ isActive }) =>
        cl('flex h-14 items-center justify-between rounded-lg px-2', isActive && 'bg-gray-100')
      }
    >
      {({ isActive }) => (
        <>
          <div>
            <div
              className={cl(
                'h-2 w-2 rounded-full',
                routine.category?.color ? `bg-${routine.category.color}-500` : 'bg-gray-300'
              )}
            />
          </div>
          <div className={cl('mx-4 h-full w-full border-b pt-1', isActive ? 'border-transparent' : 'border-gray-100')}>
            <p className="font-semibold capitalize text-gray-700">{routine.name}</p>
            <p className="flex gap-2 text-xs font-semibold text-gray-400">
              {routine.category?.name && routine.category.name}
            </p>
          </div>
          <DoneButton handleUpdateStatus={handleUpdateStatus} routine={routine} />
        </>
      )}
    </NavLink>
  )
}
