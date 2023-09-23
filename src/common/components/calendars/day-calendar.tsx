import { eachDayOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'
import { useCalendar } from './hooks'
import { DaysHeader, DaysList, MonthSelector } from './parts'

interface Props {
  date: Date
  handleDateChange: (date: Date) => void
  close: () => void
  noFuture?: boolean
  pastLimit?: number
}

export function DayCalendar({ date, handleDateChange, noFuture, pastLimit, close }: Props) {
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth } = useCalendar()

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })

  const onSelectDate = (date: Date) => {
    handleDateChange(date)
    close()
  }

  return (
    <div className="flex w-80 flex-col gap-y-4">
      <MonthSelector
        noFuture={noFuture}
        onPreviousMonth={onPreviousMonth}
        onNextMonth={onNextMonth}
        currentMonth={firstDayCurrentMonth}
        pastLimit={pastLimit}
      />
      <DaysHeader />
      <DaysList
        noFuture={noFuture}
        days={days}
        selectedDay={date}
        onSelectDay={onSelectDate}
        firstDayCurrentMonth={firstDayCurrentMonth}
      />
    </div>
  )
}
