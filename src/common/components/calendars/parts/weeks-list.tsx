import { add, eachDayOfInterval, format, getDay, isEqual, isSameMonth, isThisWeek } from 'date-fns'
import { cl } from '&/common/utils'

interface Props {
  weeks: Date[]
  selectedDay: Date
  firstDayCurrentMonth: Date
  onSelectDay: (day: Date) => void
}

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

export function WeeksList({ weeks, onSelectDay, selectedDay, firstDayCurrentMonth }: Props) {
  const getDaysOfWeek = (firstDay: Date) => eachDayOfInterval({ start: firstDay, end: add(firstDay, { days: 6 }) })

  return (
    <div className=" text-sm">
      {weeks.map((day, dayIdx) => (
        <div key={day.toString()} className={cl(dayIdx === 0 && colStartClasses[getDay(day) - 1], 'py-2')}>
          <button
            type="button"
            onClick={() => onSelectDay(day)}
            className={cl(
              isEqual(day, selectedDay) && 'text-white',
              isEqual(day, selectedDay) && isThisWeek(day) && 'bg-sky-600',
              isEqual(day, selectedDay) && !isThisWeek(day) && 'bg-gray-900',
              !isEqual(day, selectedDay) && isThisWeek(day) && 'border border-sky-100 text-sky-600 hover:bg-sky-100',

              !isEqual(day, selectedDay) &&
                !isThisWeek(day) &&
                !isSameMonth(day, firstDayCurrentMonth) &&
                'text-gray-400',
              !isEqual(day, selectedDay) && 'hover:bg-gray-200',
              (isEqual(day, selectedDay) || isThisWeek(day)) && 'font-semibold',
              'col-start-1 mx-auto grid h-8 w-full grid-cols-7 items-center justify-center gap-x-2 rounded-full text-sm transition-colors'
            )}
          >
            {getDaysOfWeek(day).map((d) => (
              <time
                key={format(d, 'd')}
                className={cl(
                  !isEqual(day, selectedDay) &&
                    !isThisWeek(day) &&
                    isSameMonth(d, firstDayCurrentMonth) &&
                    'text-gray-900'
                )}
                dateTime={format(d, 'yyyy-MM-dd')}
              >
                {format(d, 'd')}
              </time>
            ))}
          </button>
        </div>
      ))}
    </div>
  )
}
