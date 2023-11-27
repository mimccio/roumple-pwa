import { compareAsc, format, getDay, isEqual, isSameMonth, isToday, startOfToday } from 'date-fns'
import { cl } from '@/common/utils'

interface Props {
  days: Date[]
  selectedDay: Date
  firstDayCurrentMonth: Date
  onSelectDay: (day: Date) => void
  noFuture?: boolean
}

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

export function DaysList({ days, onSelectDay, selectedDay, firstDayCurrentMonth, noFuture = false }: Props) {
  return (
    <div className="col-start-1 grid grid-cols-7 text-sm">
      {days.map((day, dayIdx) => (
        <div key={day.toString()} className={cl(dayIdx === 0 && colStartClasses[getDay(day) - 1], 'py-2')}>
          <button
            type="button"
            disabled={noFuture && compareAsc(day, startOfToday()) > 0}
            onClick={() => onSelectDay(day)}
            className={cl(
              isEqual(day, selectedDay) && 'text-white',
              !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600',
              !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
              !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
              isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
              isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
              !isEqual(day, selectedDay) && 'hover:bg-gray-200',
              (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
              'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
              noFuture && compareAsc(day, startOfToday()) > 0 && 'text-slate-300'
            )}
          >
            <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
          </button>
        </div>
      ))}
    </div>
  )
}
