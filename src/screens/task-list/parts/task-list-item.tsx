import { cl, getTwColor } from '&/common/utils'
import { Task } from '&/modules/task/types'
import { NavLink } from 'react-router-dom'

interface Props {
  task: Task
}

export function TaskListItem({ task }: Props) {
  const categoryBg = task.category?.color ? getTwColor('bg', task.category.color, 500) : 'bg-gray-300'

  return (
    <NavLink
      to={`d/task/${task.id}`}
      className={({ isActive }) =>
        cl('flex h-14 items-center justify-between rounded-lg px-2', isActive && 'bg-gray-100')
      }
    >
      {({ isActive }) => (
        <>
          <div>
            <div className={cl('h-2 w-2 rounded-full', categoryBg || '')} />
          </div>
          <div
            className={cl(
              'mx-4 h-full w-full truncate border-b pt-1',
              isActive ? 'border-transparent' : 'border-gray-100'
            )}
          >
            <p className="truncate font-semibold text-gray-700">{task.name}</p>
            <div className="flex gap-2 text-xs font-semibold text-gray-500">
              <p>{task.category?.name}</p>
            </div>
          </div>
        </>
      )}
    </NavLink>
  )
}
