import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { format, getWeek } from 'date-fns'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl, getDateFnsLocale, getTwColor } from '&/common/utils'
import { SquareDoneButton } from '&/common/components/buttons/square-done-button'
import type { Task } from '&/modules/task/types'
import { useTaskStatus } from '&/modules/task/hooks'

interface Props {
  task: Task
}

export function TaskListItem({ task }: Props) {
  const { t } = useTranslation('schedule')
  const { onSelect } = useTaskStatus(task)
  const categoryBg = task.category?.color ? getTwColor('bg', task.category.color, 500) : 'bg-gray-300'

  const getDateText = () => {
    if (!task.date) return null
    if (task.scheduleType === SCHEDULE_TYPES.daily)
      return format(new Date(task.date), 'dd MMM yyyy', { locale: getDateFnsLocale() })
    if (task.scheduleType === SCHEDULE_TYPES.weekly) return t('week') + ' ' + getWeek(new Date(task.date))
    if (task.scheduleType === SCHEDULE_TYPES.monthly)
      return format(new Date(task.date), 'MMMM yyyy', { locale: getDateFnsLocale() })
  }

  const dateText = getDateText()

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
              'mx-4 flex h-full w-full flex-col gap-y-1 truncate border-b pt-1',
              isActive ? 'border-transparent' : 'border-gray-100'
            )}
          >
            <p className="truncate font-semibold text-gray-700">{task.name}</p>
            <p className="flex gap-x-2 text-xs  text-gray-500">
              <span className={cl('font-semibold', !task.category?.name && 'text-gray-300')}>
                {task.category?.name || 'no category'}
              </span>
              {dateText && <span className="text-gray-300">-</span>}
              <span>{dateText}</span>
            </p>
          </div>
          <SquareDoneButton status={task.status} priority={task.priority} onUpdate={onSelect} />
        </>
      )}
    </NavLink>
  )
}
