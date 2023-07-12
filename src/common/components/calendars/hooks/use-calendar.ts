import { useState } from 'react'
import { add, format, parse, startOfToday, sub } from 'date-fns'

export function useCalendar() {
  const today = startOfToday()

  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  function onNextMonth() {
    const firstDayOfNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayOfNextMonth, 'MMM-yyyy'))
  }

  function onPreviousMonth() {
    const firstDayOfNextMonth = sub(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayOfNextMonth, 'MMM-yyyy'))
  }

  return {
    currentMonth,
    firstDayCurrentMonth,
    onNextMonth,
    onPreviousMonth,
  }
}
