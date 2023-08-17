import { useNavigate } from 'react-router-dom'
import { eachDayOfInterval, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns'

import { RoutineAction } from '&/modules/routine/types'
import { DayActivityBoard } from './day-activity-board'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  handleDateChange: (date: Date) => void
  recurrence: number[]
  url: string
}

export function DayActivity({ actions, occurrence, handleDateChange, recurrence, url }: Props) {
  const navigate = useNavigate()

  const today = new Date()
  const prevMonth = subMonths(today, 1)

  const prevMonthDays = eachDayOfInterval({
    start: startOfMonth(prevMonth),
    end: lastDayOfMonth(prevMonth),
  })

  const currentMonthDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: lastDayOfMonth(today),
  })

  if (!actions) return null

  const onDayClick = (date: Date) => {
    handleDateChange(date)
    navigate(url)
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <DayActivityBoard
        actions={actions}
        days={prevMonthDays}
        month={prevMonth}
        occurrence={occurrence}
        onDayClick={onDayClick}
        recurrence={recurrence}
      />
      <DayActivityBoard
        actions={actions}
        days={currentMonthDays}
        month={today}
        occurrence={occurrence}
        onDayClick={onDayClick}
        recurrence={recurrence}
      />
    </div>
  )
}
