import { compareAsc, differenceInMonths, format, startOfMonth, startOfToday } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { getDateFnsLocale } from '&/common/utils'

interface Props {
  onPreviousMonth: () => void
  onNextMonth: () => void
  currentMonth: Date
  noFuture?: boolean
  pastLimit?: number
}

export function MonthSelector({ onPreviousMonth, onNextMonth, currentMonth, noFuture, pastLimit }: Props) {
  const nextIsDisabled = noFuture && compareAsc(currentMonth, startOfMonth(startOfToday())) >= 0

  const pastIsDisabled = pastLimit ? differenceInMonths(startOfToday(), currentMonth) >= pastLimit : false

  return (
    <div className="flex items-center justify-between gap-x-4 px-2 py-2">
      <button
        disabled={pastIsDisabled}
        type="button"
        onClick={onPreviousMonth}
        className="p-1 text-gray-400 hover:text-gray-500 disabled:text-gray-200"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <h2 className="text-sm font-semibold capitalize text-gray-600">
        {format(currentMonth, 'MMMM yyyy', { locale: getDateFnsLocale() })}
      </h2>
      <button
        disabled={nextIsDisabled}
        type="button"
        onClick={onNextMonth}
        className="p-1 text-gray-400 hover:text-gray-500 disabled:text-gray-200"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
