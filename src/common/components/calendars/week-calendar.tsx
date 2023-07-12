import { eachWeekOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'
import { useCalendar } from './hooks'
import { DaysHeader } from './parts/days-header'
import { MonthSelector } from './parts/month-selector'
import { WeeksList } from './parts/weeks-list'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function WeekCalendar({ date, onSelectDate }: Props) {
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth } = useCalendar()

  const weeks = eachWeekOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  return (
    <div className="flex w-80 flex-col gap-y-4">
      <MonthSelector onPreviousMonth={onPreviousMonth} onNextMonth={onNextMonth} currentMonth={firstDayCurrentMonth} />
      <DaysHeader />
      <WeeksList
        weeks={weeks}
        selectedDay={date}
        onSelectDay={onSelectDate}
        firstDayCurrentMonth={firstDayCurrentMonth}
      />
    </div>
  )
}
