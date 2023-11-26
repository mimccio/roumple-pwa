import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { ScheduleType } from '&/common/types'
import { cl, getTwBgColor } from '&/common/utils'
import { SCHEDULE_TYPES } from '&/common/constants'
import { TW_COLOR_BG_600_HOVER } from '&/common/constants/tw-colors'

import type { Routine } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import { mergeTaskAndRoutines, getItemUrl } from '../utils'
import { DotItem } from './dot-item'

interface Props {
  firstDayCurrentMonth: Date
  monthlyRoutines: Routine[]
  monthlyTasks: Task[]
  onSelect: ({ scheduleType, date }: { scheduleType: ScheduleType; date: Date }) => void
}

export function MonthPlanning({ firstDayCurrentMonth, monthlyRoutines, onSelect, monthlyTasks }: Props) {
  const { t } = useTranslation('schedule')

  const items = mergeTaskAndRoutines({
    routines: monthlyRoutines,
    tasks: monthlyTasks,
    date: firstDayCurrentMonth,
    scheduleType: SCHEDULE_TYPES.monthly,
  })

  return (
    <div className="mt-2 flex w-full rounded-md border">
      <div className=" px-4  py-2 text-center text-xs capitalize leading-6 text-gray-500">{t('month')}</div>
      <ol className="hidden flex-wrap gap-2 border-l px-2 py-2 lg:flex">
        {items.map((item) => {
          const color = item.category?.color
          return (
            <li className="max-w-[200px] truncate" key={item.id}>
              <Link
                to={getItemUrl(item)}
                className={cl(
                  'block w-full truncate rounded-sm px-2 py-1 text-xs font-medium transition-colors ',
                  color ? 'text-white' : 'text-gray-700 ',
                  color ? getTwBgColor(500, color) : 'bg-gray-100',
                  color ? TW_COLOR_BG_600_HOVER[color] : 'hover:bg-gray-200'
                )}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ol>

      <button
        className="w-full border-l px-2 lg:hidden"
        onClick={() => onSelect({ scheduleType: SCHEDULE_TYPES.monthly, date: firstDayCurrentMonth })}
      >
        <ol className="flex flex-wrap gap-1">
          {items.map((item) => (
            <DotItem key={item.id} color={item.category?.color} />
          ))}
        </ol>
      </button>
    </div>
  )
}
