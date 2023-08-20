import { useNavigate } from 'react-router-dom'
import { eachDayOfInterval, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns'

import { RoutineAction } from '&/modules/routine/types'
import { WeekActivityBoard } from './week-activity-board'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  handleDateChange: (date: Date) => void
  recurrence: number[]
  url: string
}

export function WeekActivity({ actions, occurrence, handleDateChange, recurrence, url }: Props) {
  const navigate = useNavigate()
  const today = new Date()
  const array = [...Array(4).keys()].reverse()

  if (!actions) return null

  const onDayClick = (date: Date) => {
    handleDateChange(date)
    navigate(url)
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
      {array.map((i) => {
        const month = subMonths(today, i)
        const days = eachDayOfInterval({
          start: startOfMonth(month),
          end: lastDayOfMonth(month),
        })
        return (
          <WeekActivityBoard
            key={i}
            actions={actions}
            days={days}
            month={month}
            occurrence={occurrence}
            onDayClick={onDayClick}
            recurrence={recurrence}
          />
        )
      })}
    </div>
  )
}
