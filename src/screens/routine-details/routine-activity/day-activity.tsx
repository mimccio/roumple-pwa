import { useNavigate } from 'react-router-dom'

import { RoutineAction } from '&/modules/routine/types'
import { DayActivityBoard } from './day-activity-board'
import { getDaysList } from './utils/get-days-list'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  handleDateChange: (date: Date) => void
  recurrence: number[]
  url: string
}

const BOARD_NUMBER = 4

export function DayActivity({ actions, occurrence, handleDateChange, recurrence, url }: Props) {
  const navigate = useNavigate()
  if (!actions) return null

  const daysList = getDaysList({ count: BOARD_NUMBER, actions, occurrence, recurrence })

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
