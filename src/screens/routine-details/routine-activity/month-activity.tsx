import { useNavigate } from 'react-router-dom'

import type { RoutineAction } from '&/modules/routine/types'
import { getMonthsList } from './utils'
import { MonthActivityBoard } from './month-activity-board'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  handleDateChange: (date: Date) => void
  recurrence: number[]
  url: string
  oldest: Date
}

export function MonthActivity({ actions, occurrence, handleDateChange, recurrence, url, oldest }: Props) {
  const navigate = useNavigate()

  const onMonthClick = (date: Date) => {
    handleDateChange(date)
    navigate(url)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-12">
      {getMonthsList({ count: 3, actions, occurrence, recurrence, oldest }).map((data) => (
        <MonthActivityBoard
          actions={actions}
          data={data}
          key={data.year.toISOString()}
          occurrence={occurrence}
          onMonthClick={onMonthClick}
          recurrence={recurrence}
          oldest={oldest}
        />
      ))}
    </div>
  )
}
