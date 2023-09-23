import { eachWeekOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'
import { useCalendar } from './hooks'
import { DaysHeader } from './parts/days-header'
import { MonthSelector } from './parts/month-selector'
import { WeeksList } from './parts/weeks-list'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
  close: () => void
  noFuture?: boolean
  pastLimit?: number
}

export function WeekCalendar({ date, onSelectDate, noFuture, pastLimit, close }: Props) {
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth } = useCalendar()

  const weeks = eachWeekOfInterval(
    {
      start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
    },
    { weekStartsOn: 1 }
  )

  const handleDateChange = (date: Date) => {
    onSelectDate(date)
    close()
  }

  return (
    <div className="flex w-80 flex-col gap-y-4">
      <MonthSelector
        currentMonth={firstDayCurrentMonth}
        noFuture={noFuture}
        onNextMonth={onNextMonth}
        onPreviousMonth={onPreviousMonth}
        pastLimit={pastLimit}
      />
      <DaysHeader />
      <WeeksList
        firstDayCurrentMonth={firstDayCurrentMonth}
        noFuture={noFuture}
        onSelectDay={handleDateChange}
        selectedDay={startOfWeek(date, { weekStartsOn: 1 })}
        weeks={weeks}
      />
    </div>
  )
}
