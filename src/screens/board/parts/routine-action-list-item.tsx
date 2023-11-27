import { NavLink } from 'react-router-dom'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import { cl } from '@/common/utils'
import { Routine, UpdateStatusParams } from '@/modules/routine/types'
import { DoneButton } from './done-button'

interface Props {
  routine: Routine
  handleUpdateStatus: ({ routine, action, status }: UpdateStatusParams) => void
}

export function RoutineActionListItem({ routine, handleUpdateStatus }: Props) {
  const doneOccurrence = routine.actions?.[0]?.doneOccurrence || 0

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
          <div
            className={cl(
              'mx-4 flex h-full w-full flex-col justify-center gap-y-1 truncate border-b pt-1',
              isActive ? 'border-transparent' : 'border-gray-100'
            )}
          >
            <p className="font-semibold capitalize text-gray-700">{routine.name}</p>
            <p className="flex items-center gap-x-2 text-xs font-semibold text-gray-500">
              <span
                className={cl(
                  'flex items-center gap-x-2 text-xs font-semibold',
                  !routine.category?.name ? 'text-gray-300' : 'text-gray-500'
                )}
              >
                {routine.category?.name || 'no category'}
              </span>
              {routine.occurrence > 1 && <span className="text-gray-300">-</span>}
              {routine.occurrence > 1 && (
                <span
                  className={cl(
                    'flex items-center gap-x-1',
                    doneOccurrence >= routine.occurrence ? 'text-green-500' : 'text-gray-500'
                  )}
                >
                  <ArrowPathRoundedSquareIcon width={12} height={12} />
                  {doneOccurrence} / {routine.occurrence}
                </span>
              )}
            </p>
          </div>
          <DoneButton handleUpdateStatus={handleUpdateStatus} routine={routine} />
        </>
      )}
    </NavLink>
  )
}
