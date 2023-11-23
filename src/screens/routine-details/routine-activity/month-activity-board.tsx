import { addMonths, compareAsc, format, getMonth, isSameMonth, isThisMonth } from 'date-fns'
import { motion } from 'framer-motion'

import { useGetDateFnsLocale } from '&/common/hooks'
import { cl } from '&/common/utils'

import { RoutineAction } from '&/modules/routine/types'
import { getSquareColors } from './utils'
import { Progression } from './progression'

interface Data {
  year: Date
  prevSuccessNum: number
  successNum: number
  isLast?: boolean
  previousCreation: boolean
  months: Date[]
}

interface Props {
  actions: RoutineAction[]
  occurrence: number
  onMonthClick: (date: Date) => void
  recurrence: number[]
  data: Data
  oldest: Date
}

export function MonthActivityBoard({ data, actions, occurrence, onMonthClick, recurrence, oldest }: Props) {
  const { locale } = useGetDateFnsLocale()
  if (data.previousCreation) return null

  return (
    <div className="">
      <h6 className="mb-4 ml-4 font-serif text-sm  font-semibold text-gray-500">{format(data.year, 'yyyy')}</h6>
      <div className="flex flex-wrap  gap-x-4 gap-y-4 px-4">
        {data.months.map((month) => {
          const action = actions.find((action) => isSameMonth(month, new Date(action.date)))
          const isScheduled =
            compareAsc(addMonths(month, 1), new Date(oldest)) > 0 && recurrence.includes(getMonth(month))
          const isFuture = compareAsc(month, new Date()) > 0

          return (
            <motion.button
              key={month.toString()}
              disabled={isFuture}
              onClick={() => onMonthClick(month)}
              className={cl(
                'flex h-8 w-8 items-center justify-center rounded-md border font-semibold text-gray-600',
                getSquareColors({
                  action,
                  day: month,
                  isScheduled,
                  occurrence,
                  isFuture,
                  isThisMonth: isThisMonth(month),
                })
              )}
              whileHover={{ scale: isFuture ? 1 : 1.5 }}
            >
              {format(month, 'LLLLL', { locale })}
            </motion.button>
          )
        })}
      </div>
      <Progression successNum={data.successNum} prevSuccessNum={data.prevSuccessNum} isLast={data.isLast} />
    </div>
  )
}
