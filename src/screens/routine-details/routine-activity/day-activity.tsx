import { useNavigate } from 'react-router-dom'

import { SCHEDULE_TYPES } from '&/common/constants'
import { RoutineAction } from '&/modules/routine/types'
import { getDaysList } from './utils'
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
  if (!actions) return null

  const daysList = getDaysList({
    count: 4,
    actions,
    occurrence,
    recurrence,
    scheduleType: SCHEDULE_TYPES.daily,
  })

  const onDayClick = (date: Date) => {
    handleDateChange(date)
    navigate(url)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-12 gap-y-12">
      {daysList.map(({ days, month, successNum, prevSuccessNum, isLast }) => (
        <DayActivityBoard
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
