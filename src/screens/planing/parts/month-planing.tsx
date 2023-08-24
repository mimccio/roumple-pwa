import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { ScheduleType } from '&/common/types'
import { cl, getTwBgColor } from '&/common/utils'
import { SCHEDULE_TYPES } from '&/common/constants'
import { TW_COLOR_BG_200_HOVER } from '&/common/constants/tw-colors'
import type { Routine } from '&/modules/routine/types'
import { getMonthlyScheduledRoutines } from '../utils/get-scheduled-routines'
import { DotItem } from './dot-item'

interface Props {
  firstDayCurrentMonth: Date
  monthlyRoutines: Routine[]
  onSelect: ({ type, date }: { type: ScheduleType; date: Date }) => void
}

export function MonthPlaning({ firstDayCurrentMonth, monthlyRoutines, onSelect }: Props) {
  const { t } = useTranslation('schedule')

  return (
    <div className="mt-2 flex w-full rounded-md border">
      <div className=" px-4  py-2 text-center text-xs capitalize leading-6 text-gray-500">{t('month')}</div>
      <ol className="hidden flex-wrap gap-2 border-l px-2 py-2 lg:flex">
        {getMonthlyScheduledRoutines({ date: firstDayCurrentMonth, routines: monthlyRoutines }).map((routine) => (
          <li className="max-w-[200px] truncate" key={routine.id}>
            <Link
              to={`/routines/d/routine/${routine.id}`}
              className={cl(
                'block w-full truncate rounded-sm px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:text-gray-900',
                getTwBgColor(100, routine.category?.color || 'gray'),
                TW_COLOR_BG_200_HOVER[routine.category?.color || 'gray']
              )}
            >
              {routine.name}
            </Link>
          </li>
        ))}
      </ol>

      <button
        className="w-full border-l px-2 lg:hidden"
        onClick={() => onSelect({ type: SCHEDULE_TYPES.monthly, date: firstDayCurrentMonth })}
      >
        <ol className="flex flex-wrap gap-1">
          {getMonthlyScheduledRoutines({ date: firstDayCurrentMonth, routines: monthlyRoutines }).map((routine) => (
            <DotItem key={routine.id} color={routine.category?.color} />
          ))}
        </ol>
      </button>
    </div>
  )
}
