import { useNavigate } from 'react-router-dom'

import { SCHEDULE_TYPES } from '&/common/constants'
import { RoutineAction } from '&/modules/routine/types'
import { getDaysList } from './utils'
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
  if (!actions) return null

  const daysList = getDaysList({
    count: 4,
    actions,
    occurrence,
    recurrence,
    scheduleType: SCHEDULE_TYPES.weekly,
  })

  const onDayClick = (date: Date) => {
    handleDateChange(date)
    navigate(url)
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
      {daysList.map(({ days, month, successNum, prevSuccessNum, isLast }) => (
        <WeekActivityBoard
          actions={actions}
          days={days}
          isLast={isLast}
          key={month.toISOString()}
          month={month}
          occurrence={occurrence}
          onDayClick={onDayClick}
          prevSuccessNum={prevSuccessNum}
          recurrence={recurrence}
          successNum={successNum}
        />
      ))}
    </div>
  )
}
