import { eachDayOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'
import { useCalendar } from './hooks'
import { DaysHeader, DaysList, MonthSelector } from './parts'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function DayCalendar({ date, onSelectDate }: Props) {
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth } = useCalendar()

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })

  return (
    <div className="flex w-80 flex-col gap-y-4">
      <MonthSelector onPreviousMonth={onPreviousMonth} onNextMonth={onNextMonth} currentMonth={firstDayCurrentMonth} />
      <DaysHeader />
      <DaysList days={days} selectedDay={date} onSelectDay={onSelectDate} firstDayCurrentMonth={firstDayCurrentMonth} />
    </div>
  )
}
