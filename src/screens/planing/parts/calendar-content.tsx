import { getDate, isSameMonth, isToday } from 'date-fns'
import { cl } from '&/common/utils'
import type { Routine } from '&/modules/routine/types'
import { RoutineLargeItem } from './routine-item'
import { DotItem } from './dot-item'
import { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { getDailyScheduledRoutines } from '../utils/get-scheduled-routines'

interface Props {
  days: Date[]
  dailyRoutines: Routine[]
  today: Date
  onSelect: ({ type, date }: { type: ScheduleType; date: Date }) => void
}

export function CalendarContent({ days, dailyRoutines, today, onSelect }: Props) {
  return (
    <div className="flex w-full flex-1  bg-gray-200 text-xs text-gray-700">
      {/* large screen */}
      <div className="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={cl(
              isSameMonth(day, today) ? 'bg-white' : 'bg-gray-50 text-gray-500',
              'rounded-in relative max-h-[250px] overflow-x-hidden overflow-y-scroll px-1 py-1'
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
              {getDailyScheduledRoutines({ date: day, routines: dailyRoutines }).map((routine) => (
                <RoutineLargeItem
                  key={routine.id}
                  name={routine.name}
                  id={routine.id}
                  color={routine.category?.color}
                  date={day}
                />
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* small screen */}
      <div className="isolate grid w-full grid-cols-7 gap-px lg:hidden">
        {days.map((day) => {
          const routines = getDailyScheduledRoutines({ date: day, routines: dailyRoutines })
          return (
            <button
              key={day.toString()}
              onClick={() => onSelect({ type: SCHEDULE_TYPES.daily, date: day })}
              type="button"
              className={cl(
                isSameMonth(day, today) ? 'bg-white' : 'bg-gray-50',
                'flex h-20 flex-col overflow-hidden px-1 py-2 hover:bg-gray-100 focus:z-10'
              )}
            >
              <time dateTime={day.toString()} className={cl('mb-2 ml-auto')}>
                {getDate(day)}
              </time>
              <span className="sr-only">{routines.length} events</span>
              {routines.length > 0 && (
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  {routines.map((routine) => (
                    <DotItem key={routine.id} color={routine.category?.color} />
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
