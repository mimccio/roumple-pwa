import { cl } from '&/common/utils'
import { FlagIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'

interface Routine {
  id: number
  name: string
  priority: number
  category?: { name: string; color: string }
}

interface Props {
  routine: Routine
}

export function Item({ routine }: Props) {
  const getPriorityColor = () => {
    if (routine.priority === 1) return 'text-blue-500'
    if (routine.priority === 2) return 'text-orange-500'
    return 'text-gray-400'
  }

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
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
          </div>
          <div className={cl('mx-4 h-full w-full border-b pt-1', isActive ? 'border-transparent' : 'border-gray-100')}>
            <p className="capitalize text-gray-800">{routine.name}</p>
            <p className="text-sm font-semibold text-gray-400">category</p>
          </div>
          <span className="pr-2">
            <FlagIcon width={20} className={getPriorityColor()} />
          </span>
        </>
      )}
    </NavLink>
  )
}
