import { compareAsc, format, getDay, isSameDay, isToday } from 'date-fns'
import { motion } from 'framer-motion'

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
          const dayNum = getDay(day)
          const action = actions.find((action) => isSameDay(day, new Date(action.date)))
          const isFuture = compareAsc(day, new Date()) > 0
          const isScheduled = recurrence.includes(dayNum)
          const isCurDay = isToday(day)
          const doneOccurrence = action?.doneOccurrence || 0

          return (
            <div
              key={day.toString()}
              className={cl(
                dayIdx === 0 && colStartClasses[dayNum === 0 ? 6 : dayNum - 1],
                'flex items-center justify-center'
              )}
            >
              <motion.button
                onClick={() => onDayClick(day)}
                type="button"
                disabled={isFuture}
                className={cl(
                  'group flex h-4 w-4 items-center justify-center rounded-md border text-[9px] text-gray-500 ',
                  !isFuture && isScheduled && !action && 'border-orange-100 bg-orange-50 text-orange-500',
                  isCurDay && 'border-2 border-sky-500',
                  !isScheduled && !action && 'border-gray-200 bg-white',
                  isFuture && 'border-gray-200 bg-gray-100 text-gray-400',
                  doneOccurrence === occurrence && 'border-green-400 bg-green-400 ',
                  isScheduled &&
                    action?.status === STATUSES.todo &&
                    doneOccurrence === 0 &&
                    'border-orange-100 bg-orange-50 text-orange-500',
                  (doneOccurrence > 0 || action?.status === STATUSES.inProgress) &&
                    'border-blue-400 bg-blue-400 text-blue-50'
                )}
                whileHover={{ scale: isFuture ? 1 : 1.5 }}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">{format(day, 'dd')}</span>
              </motion.button>
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
