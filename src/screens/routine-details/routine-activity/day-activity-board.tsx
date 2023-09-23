import { STATUSES } from '&/common/constants'
import { cl, getDateFnsLocale } from '&/common/utils'
import { RoutineAction } from '&/modules/routine/types'
import { compareAsc, format, getDay, isSameDay } from 'date-fns'

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

interface Props {
  actions: RoutineAction[]
  occurrence: number
  days: Date[]
  month: Date
  onDayClick: (date: Date) => void
  recurrence: number[]
}

export function DayActivityBoard({ actions, occurrence, days, month, onDayClick, recurrence }: Props) {
  return (
    <div className="">
      <h6 className="font-semi-bold mb-2 flex w-64 justify-center text-sm capitalize text-gray-600 ">
        {format(month, 'MMMM', { locale: getDateFnsLocale() })}
      </h6>
      <div className="col-start-1 grid h-48 w-64 grid-cols-7 items-center rounded-xl border border-gray-200 p-1">
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
    </div>
  )
}
