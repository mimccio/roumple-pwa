import { useNavigate } from 'react-router-dom'
import { format, getMonth, isSameMonth, startOfToday, subMonths } from 'date-fns'

import { cl, getDateFnsLocale } from '&/common/utils'
import type { RoutineAction } from '&/modules/routine/types'
import { STATUSES } from '&/common/constants'

interface Props {
  actions: RoutineAction[]
  occurrence: number
  handleDateChange: (date: Date) => void
  recurrence: number[]
  url: string
}

export function MonthActivity({ actions, occurrence, handleDateChange, recurrence, url }: Props) {
  const navigate = useNavigate()
  const today = startOfToday()
  const array = [...Array(12).keys()].reverse()

  const onMonthClick = (date: Date) => {
    handleDateChange(date)
    navigate(url)
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap  gap-x-4 gap-y-4 px-4">
        {array.map((i) => {
          const date = subMonths(today, i)
          const action = actions.find((action) => isSameMonth(date, new Date(action.date)))
          const isScheduled = recurrence.includes(getMonth(date))

          return (
            <button
              onClick={() => onMonthClick(date)}
              className={cl(
                'flex h-8 w-8 items-center justify-center rounded-md border font-semibold text-gray-600',
                !isScheduled && !action && 'border-gray-100 bg-white',
                Boolean(action) && 'border-transparent',
                action?.status === STATUSES.done && action.doneOccurrence === occurrence && 'bg-green-400 text-white',
                action?.status === STATUSES.done && action.doneOccurrence < occurrence && 'bg-blue-400 text-white',
                action?.status === STATUSES.inProgress && 'bg-blue-400 text-white',
                action?.status === STATUSES.todo && action.doneOccurrence === 0 && 'bg-gray-200',
                action?.doneOccurrence && action.doneOccurrence > 0 ? 'bg-blue-400 text-white' : '',
                !action && 'bg-gray-200'
              )}
              key={i}
            >
              {format(date, 'LLLLL', { locale: getDateFnsLocale() })}
            </button>
          )
        })}
      </div>
    </div>
  )
}
