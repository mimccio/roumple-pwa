import { getDate, isSameMonth, isToday } from 'date-fns'

import type { ScheduleType } from '@/common/types'
import { SCHEDULE_TYPES } from '@/common/constants'
import { cl } from '@/common/utils'

import type { Routine } from '@/modules/routine/types'
import type { Task } from '@/modules/task/types'

import { mergeTaskAndRoutines } from '../utils/'
import { PlanningItem } from './planning-item'
import { DotItem } from './dot-item'

interface Props {
  days: Date[]
  dailyRoutines: Routine[]
  dailyTasks: Task[]
  today: Date
  onSelect: ({ scheduleType, date }: { scheduleType: ScheduleType; date: Date }) => void
}

export function CalendarContent({ days, dailyRoutines, today, onSelect, dailyTasks }: Props) {
  return (
    <div className="flex w-full flex-1  bg-gray-200 text-xs text-gray-700">
      {/* large screen */}
      <div className="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
        {days.map((day) => {
          const items = mergeTaskAndRoutines({
            routines: dailyRoutines,
            tasks: dailyTasks,
            date: day,
            scheduleType: SCHEDULE_TYPES.daily,
          })
          return (
            <div
              key={day.toString()}
              className={cl(
                isSameMonth(day, today) ? 'bg-white' : 'bg-gray-50 text-gray-500',
                'rounded-in relative h-44  px-1 py-1'
              )}
            >
              <time
                dateTime={day.toString()}
                className={cl(
                  'flex h-6 w-6 items-center justify-center rounded-full font-semibold',
                  isToday(day) ? ' bg-indigo-600 font-semibold text-white' : 'text-indigo-700'
                )}
              >
                {getDate(day)}
              </time>

              <ol className="mb-2 mt-2 flex flex-col gap-y-1">
                {items.slice(0, 5).map((item) => (
                  <PlanningItem key={item.id} date={day} item={item} />
                ))}
              </ol>
              {items.length > 5 && (
                <button
                  onClick={() => onSelect({ scheduleType: SCHEDULE_TYPES.daily, date: day })}
                  className="mt-2 w-full rounded-sm border text-gray-500 transition-colors hover:text-gray-700"
                >
                  see more
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* small screen */}
      <div className="isolate grid w-full grid-cols-7 gap-px lg:hidden">
        {days.map((day) => {
          const items = mergeTaskAndRoutines({
            routines: dailyRoutines,
            tasks: dailyTasks,
            date: day,
            scheduleType: SCHEDULE_TYPES.daily,
          })
          return (
            <button
              key={day.toString()}
              onClick={() => onSelect({ scheduleType: SCHEDULE_TYPES.daily, date: day })}
              type="button"
              className={cl(
                isSameMonth(day, today) ? 'bg-white' : 'bg-gray-50',
                'flex h-20 flex-col overflow-hidden px-1 py-2 hover:bg-gray-100 focus:z-10'
              )}
            >
              <time dateTime={day.toString()} className={cl('mb-2 ml-auto')}>
                {getDate(day)}
              </time>
              <span className="sr-only">{items.length} events</span>
              {items.length > 0 && (
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  {items.map((item) => (
                    <DotItem key={item.id} color={item.category?.color} />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
