import { useTranslation } from 'react-i18next'
import { compareAsc, eachWeekOfInterval, endOfMonth, endOfWeek, getWeek, isThisWeek, startOfWeek } from 'date-fns'
import { cl } from '&/common/utils'
import type { Routine } from '&/modules/routine/types'
import { RoutineLargeItem } from './routine-item'
import { DotItem } from './dot-item'
import { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'

interface Props {
  firstDayCurrentMonth: Date
  weeklyRoutines: Routine[]
  onSelect: ({ type, date }: { type: ScheduleType; date: Date }) => void
}

export function WeekPlaning({ firstDayCurrentMonth, weeklyRoutines, onSelect }: Props) {
  const { t } = useTranslation('schedule')

  const weeks = eachWeekOfInterval(
    {
      start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
    },
    { weekStartsOn: 1 }
  )

  const getWeeklyScheduledRoutines = (week: Date) =>
    weeklyRoutines
      .filter(
        (r) =>
          compareAsc(week, startOfWeek(new Date(r.created_at))) >= 0 && r.daily_recurrence.includes(getWeek(week) % 2)
      )
      .sort((a, b) => b.priority - a.priority)

  return (
    <div className=" ml-1  lg:flex lg:flex-col">
      <div className=" flex justify-center  rounded-t-md border py-2 text-center text-xs capitalize leading-6 text-gray-500">
        <p className="hidden lg:flex">{t('week')}</p>
        <p className="hidden sm:flex lg:hidden">{t('week').slice(0, 4)}</p>
        <p className="flex sm:hidden">{t('week').slice(0, 1)}</p>
      </div>

      {/* big screen */}
      <div className="hidden grow flex-col lg:flex">
        {weeks.map((week) => (
          <div
            key={week.toString()}
            className="rounded-in relative flex max-h-[250px]  flex-1 grow flex-col overflow-y-scroll border border-t-0 bg-white  px-1 py-1"
          >
            <time
              dateTime={week.toString()}
              className={cl(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                isThisWeek(week) ? ' bg-sky-600  font-semibold text-white' : 'text-sky-700'
              )}
            >
              {getWeek(week)}
            </time>

            <ol className="mb-2 mt-2 flex flex-col gap-y-1">
              {getWeeklyScheduledRoutines(week).map((routine) => (
                <RoutineLargeItem
                  key={routine.id}
                  name={routine.name}
                  id={routine.id}
                  color={routine.category?.color}
                  date={week}
                />
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* small screen */}
      <div className="isolate flex w-full flex-col gap-px lg:hidden">
        {weeks.map((week) => {
          const routines = getWeeklyScheduledRoutines(week)
          return (
            <button
              key={week.toString()}
              onClick={() => onSelect({ type: SCHEDULE_TYPES.weekly, date: week })}
              type="button"
              className={cl(
                'flex h-20 flex-col overflow-hidden border border-t-0 px-3  py-2 hover:bg-gray-100 focus:z-10'
              )}
            >
              <time dateTime={week.toString()} className={cl('ml-auto text-xs')}>
                {getWeek(week)}
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
