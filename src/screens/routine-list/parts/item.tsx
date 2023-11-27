import { useTranslation } from 'react-i18next'
import { cl } from '@/common/utils'
import { RoutineItem } from '@/modules/routine/types'
import { getScheduleTypeColor } from '@/modules/routine/utils'
import { FlagIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'

interface Props {
  routine: RoutineItem
}

export function Item({ routine }: Props) {
  const { t } = useTranslation('schedule')

  const getPriorityColor = () => {
    if (routine.priority === 1) return 'text-blue-500'
    if (routine.priority === 2) return 'text-orange-500'
    return 'text-gray-400'
  }

  const typeColor = getScheduleTypeColor(routine.scheduleType)

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
              'mx-4 h-full w-full truncate border-b pt-1',
              isActive ? 'border-transparent' : 'border-gray-100'
            )}
          >
            <p className="truncate font-semibold text-gray-700">{routine.name}</p>
            <div className="flex gap-2 text-xs font-semibold text-gray-500">
              <p className={`lowercase opacity-75 ${typeColor}`}>{t(routine.scheduleType.toLocaleLowerCase())}</p>
              <p>{routine.category?.name && routine.category.name}</p>
            </div>
          </div>
          <span className="pr-2">
            <FlagIcon width={20} className={getPriorityColor()} />
          </span>
        </>
      )}
    </NavLink>
  )
}
