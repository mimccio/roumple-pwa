import { useNavigate, useParams } from 'react-router-dom'
import { eachDayOfInterval, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns'

import { useMainPath } from '&/common/hooks'
import { RoutineAction } from '&/modules/routine/types'
import { DayActivityBoard } from './day-activity-board'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  handleDateChange: (date: Date) => void
  recurrence: number[]
}

export function DayActivity({ actions, occurrence, handleDateChange, recurrence }: Props) {
  const navigate = useNavigate()
  const { routineId } = useParams()
  const mainPath = useMainPath()

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
    navigate(`${mainPath}/d/routine/${routineId}`)
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
