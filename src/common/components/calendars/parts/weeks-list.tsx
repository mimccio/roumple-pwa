import {
  add,
  compareAsc,
  eachDayOfInterval,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isThisWeek,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { cl } from '&/common/utils'

interface Props {
  weeks: Date[]
  selectedDay: Date
  firstDayCurrentMonth: Date
  onSelectDay: (day: Date) => void
  noFuture?: boolean
}

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

export function WeeksList({ weeks, onSelectDay, selectedDay, firstDayCurrentMonth, noFuture = false }: Props) {
  const getDaysOfWeek = (firstDay: Date) => eachDayOfInterval({ start: firstDay, end: add(firstDay, { days: 6 }) })

  return (
    <div className=" text-sm">
      {weeks.map((day, dayIdx) => {
        const firstDayOfWeek = startOfWeek(day, { weekStartsOn: 1 })

        return (
          <div key={day.toString()} className={cl(dayIdx === 0 && colStartClasses[getDay(day) - 1], 'py-2')}>
            <button
              disabled={noFuture && compareAsc(firstDayOfWeek, startOfWeek(startOfToday())) > 0}
              type="button"
              onClick={() => onSelectDay(day)}
              className={cl(
                isEqual(firstDayOfWeek, selectedDay) && 'text-white',
                isEqual(firstDayOfWeek, selectedDay) && isThisWeek(firstDayOfWeek) && 'bg-sky-600',
                isEqual(firstDayOfWeek, selectedDay) && !isThisWeek(firstDayOfWeek) && 'bg-gray-900',
                !isEqual(firstDayOfWeek, selectedDay) &&
                  isThisWeek(firstDayOfWeek) &&
                  'border border-sky-100 text-sky-600 hover:bg-sky-100',

                !isEqual(firstDayOfWeek, selectedDay) &&
                  !isThisWeek(firstDayOfWeek) &&
                  !isSameMonth(firstDayOfWeek, firstDayCurrentMonth) &&
                  'text-gray-400',
                !isEqual(firstDayOfWeek, selectedDay) && 'enabled:hover:bg-gray-200',
                (isEqual(firstDayOfWeek, selectedDay) || isThisWeek(firstDayOfWeek)) && 'font-semibold',
                'col-start-1 mx-auto grid h-8 w-full grid-cols-7 items-center justify-center gap-x-2 rounded-full text-sm transition-colors '
              )}
            >
              {getDaysOfWeek(firstDayOfWeek).map((d) => (
                <time
                  key={format(d, 'd')}
                  className={cl(
                    !isEqual(firstDayOfWeek, selectedDay) &&
                      !isThisWeek(firstDayOfWeek) &&
                      isSameMonth(d, firstDayCurrentMonth) &&
                      'text-gray-900',
                    noFuture && compareAsc(firstDayOfWeek, startOfToday()) > 0 && 'text-slate-300'
                  )}
                  dateTime={format(d, 'yyyy-MM-dd')}
                >
                  {format(d, 'd')}
                </time>
              ))}
            </button>
          </div>
        )
      })}
    </div>
  )
}
