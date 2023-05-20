import { NavLink } from 'react-router-dom'
import { cl } from '&/common/utils'
import { Routine, UpdateStatusParams } from '&/modules/routine/types'
import { DoneButton } from './done-button'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, actionId, done }: UpdateStatusParams) => void
}

export function RoutineActionListItem({ routine, handleUpdateStatus }: Props) {
  return (
    <NavLink
      to={`d/action/${routine.id}`}
      className={({ isActive }) =>
        cl('flex h-14 items-center justify-between rounded-lg px-2', isActive && 'bg-gray-100')
      }
    >
      {({ isActive }) => (
        <>
          <div>
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
          </div>
          <div className={cl('mx-4 h-full w-full border-b pt-1', isActive ? 'border-transparent' : 'border-gray-100')}>
            <p className="capitalize text-gray-800">{routine.name}</p>
            <p className="text-sm font-semibold text-gray-400">category</p>
          </div>
          <DoneButton
            handleUpdateStatus={handleUpdateStatus}
            priority={routine.priority}
            action={routine.actions[0]}
            routine={routine}
          />
        </>
      )}
    </NavLink>
  )
}
