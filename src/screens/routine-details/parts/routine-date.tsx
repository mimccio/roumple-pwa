import { add, isSameDay, isSameMonth, isSameWeek, startOfToday, sub } from 'date-fns'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import { useActionDateText } from '&/modules/routine/hooks'
import { ScheduleType } from '&/common/types'

interface Props {
  scheduleType: ScheduleType
  date: Date
  handleDateChange: (date: Date) => void
}

export function RoutineDate({ scheduleType, date, handleDateChange }: Props) {
  const { getDateText } = useActionDateText()

  const getIsCurrentDate = () => {
    if (scheduleType === SCHEDULE_TYPES.daily && isSameDay(date, startOfToday())) return true
    if (scheduleType === SCHEDULE_TYPES.weekly && isSameWeek(date, startOfToday())) return true
    if (scheduleType === SCHEDULE_TYPES.monthly && isSameMonth(date, startOfToday())) return true
  }

  const getDisabledPreview = () => {
    // TODO: disable if it's to old
    return false
  }

  const isCurrentDate = getIsCurrentDate()
  const previousIsDisabled = getDisabledPreview()

  const duration = { months: 0, weeks: 0, days: 0 }
  if (scheduleType === SCHEDULE_TYPES.daily) duration.days = 1
  if (scheduleType === SCHEDULE_TYPES.weekly) duration.weeks = 1
  if (scheduleType === SCHEDULE_TYPES.monthly) duration.months = 1

  const onPreviousClick = () => !previousIsDisabled && handleDateChange(sub(date, duration))
  const onNexClick = () => !isCurrentDate && handleDateChange(add(date, duration))

  const dateText = getDateText({ date, scheduleType: scheduleType })

  const getTextColor = () => {
    if (isCurrentDate) return 'text-gray-500'
    if (scheduleType === SCHEDULE_TYPES.weekly) return 'text-sky-600 hover:text-sky-800'
    if (scheduleType === SCHEDULE_TYPES.monthly) return 'text-purple-600 hover:text-purple-800'
    return 'text-indigo-600 hover:text-indigo-800'
  }

  const goToCurrentDate = () => handleDateChange(startOfToday())

  return (
    <div className="-mt-1 flex justify-between gap-x-2">
      <button
        onClick={onPreviousClick}
        className="text-gray-500 transition-colors hover:text-gray-700 disabled:text-gray-300"
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
        className=" text-gray-500 transition-colors hover:text-gray-700 disabled:text-gray-300"
        disabled={isCurrentDate}
      >
        <ChevronRightIcon width={16} />
      </button>
    </div>
  )
}