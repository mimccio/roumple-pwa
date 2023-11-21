import { compareAsc, format, getDay, isSameDay } from 'date-fns'

import { STATUSES } from '&/common/constants'
import { cl } from '&/common/utils'
import { useGetDateFnsLocale } from '&/common/hooks'
import { RoutineAction } from '&/modules/routine/types'
import { Progression } from './progression'

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

interface Props {
  actions: RoutineAction[]
  days: Date[]
  isLast?: boolean
  month: Date
  occurrence: number
  onDayClick: (date: Date) => void
  prevSuccessNum?: number
  recurrence: number[]
  successNum: number
}

export function DayActivityBoard({
  actions,
  days,
  isLast,
  month,
  occurrence,
  onDayClick,
  prevSuccessNum,
  recurrence,
  successNum,
}: Props) {
  const { locale } = useGetDateFnsLocale()

  return (
    <div className="">
      <h6 className="mb-2 flex w-64 justify-center font-serif text-xs  font-semibold capitalize text-gray-500">
        {format(month, 'MMMM', { locale })}
      </h6>
      <div className="col-start-1 grid h-48 w-64 grid-cols-7 items-center rounded-xl border border-gray-200 p-1 shadow-sm">
        {days.map((day, dayIdx) => {
          const action = actions.find((action) => isSameDay(day, new Date(action.date)))
          const isFuture = compareAsc(day, new Date()) > 0
          const isScheduled = recurrence.includes(getDay(day))

          return (
            <div
              key={day.toString()}
              className={cl(dayIdx === 0 && colStartClasses[getDay(day) - 1], 'flex items-center justify-center')}
            >
              <button
                onClick={() => onDayClick(day)}
                type="button"
                disabled={isFuture}
                className={cl(
                  'h-4 w-4 rounded-md border',
                  !isScheduled && !action && 'border-gray-100 bg-white',
                  isFuture && isScheduled && 'border-gray-100 bg-gray-50',
                  Boolean(action) && 'border-transparent',
                  action?.status === STATUSES.inProgress && 'bg-cyan-500',
                  action?.status === STATUSES.todo && action.doneOccurrence === 0 && 'bg-gray-200',
                  action?.doneOccurrence && action.doneOccurrence > 0 ? 'bg-cyan-500' : '',
                  action?.doneOccurrence && action.doneOccurrence >= occurrence ? 'bg-green-500' : '',
                  !action && 'bg-gray-200'
                )}
              ></button>
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-x-4 text-sm font-semibold text-gray-500">
        <span>{successNum} %</span>
        <Progression prev={prevSuccessNum} cur={successNum} isLast={isLast} />
      </div>
    </div>
  )
}
