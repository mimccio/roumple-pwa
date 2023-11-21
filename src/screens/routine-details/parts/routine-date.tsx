import {
  add,
  compareAsc,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub,
} from 'date-fns'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import type { ScheduleType } from '&/common/types'
import { useActionDateText } from '&/modules/routine/hooks'
import { getIsCurrentDate } from '&/modules/routine/utils'

interface Props {
  scheduleType: ScheduleType
  date: Date
  handleDateChange: (date: Date) => void
}

export function RoutineDate({ scheduleType, date: dayDate, handleDateChange }: Props) {
  const { getDateText } = useActionDateText()
  const today = startOfToday()
  const getDate = () => {
    let date = dayDate
    if (scheduleType === SCHEDULE_TYPES.weekly) date = startOfWeek(date, { weekStartsOn: 1 })
    if (scheduleType === SCHEDULE_TYPES.monthly) date = startOfMonth(date)
    return date
  }
  const date = getDate()

  const getDisabledPreview = () => {
    if (scheduleType === SCHEDULE_TYPES.daily) {
      const days = differenceInDays(today, date)
      // TODO?: handle better limit => go to first day of month
      return days > 62 // ~ 2 months
    }
    if (scheduleType === SCHEDULE_TYPES.weekly) {
      const weeks = differenceInWeeks(today, date)
      return weeks > 25 // ~ 5 months
    }
    if (scheduleType === SCHEDULE_TYPES.monthly) {
      const months = differenceInMonths(today, date)
      return months > 10
    }
    return false
  }

  const isCurrentDate = getIsCurrentDate({ scheduleType, date })
  const previousIsDisabled = getDisabledPreview()
  const isFuture = compareAsc(date, today) >= 0

  const duration = { months: 0, weeks: 0, days: 0 }
  if (scheduleType === SCHEDULE_TYPES.daily) duration.days = 1
  if (scheduleType === SCHEDULE_TYPES.weekly) duration.weeks = 1
  if (scheduleType === SCHEDULE_TYPES.monthly) duration.months = 1

  const onPreviousClick = () => !previousIsDisabled && handleDateChange(sub(date, duration))
  const onNexClick = () => !isFuture && handleDateChange(add(date, duration))

  const dateText = getDateText({ date, scheduleType: scheduleType })

  const getTextColor = () => {
    if (isCurrentDate) return 'text-gray-500'
    if (scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-600 hover:text-sky-800'
    if (scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-600 hover:text-purple-800'
    return 'text-indigo-600 hover:text-indigo-800'
  }

  const goToCurrentDate = () => handleDateChange(today)

  return (
    <div className="flex justify-between gap-x-2 border-b bg-gray-50">
      <button
        onClick={onPreviousClick}
        className="px-2 py-1 text-gray-500 transition-colors hover:text-gray-700 disabled:text-gray-300"
        disabled={previousIsDisabled}
      >
        <ChevronLeftIcon width={16} />
      </button>
      <button
        onClick={goToCurrentDate}
        disabled={isCurrentDate}
        className={cl('text-xs transition-colors', getTextColor())}
      >
        {dateText}
      </button>
      <button
        onClick={onNexClick}
        className="px-2 py-1 text-gray-500 transition-colors hover:text-gray-700 disabled:text-gray-300"
        disabled={isCurrentDate}
      >
        <ChevronRightIcon width={16} />
      </button>
    </div>
  )
}
