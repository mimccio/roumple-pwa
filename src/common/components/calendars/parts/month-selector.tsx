import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'

interface Props {
  onPreviousMonth: () => void
  onNextMonth: () => void
  currentMonth: Date
}

export function MonthSelector({ onPreviousMonth, onNextMonth, currentMonth }: Props) {
  return (
    <div className="flex items-center justify-between gap-x-4 px-2 py-2">
      <button type="button" onClick={onPreviousMonth} className="p-1 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <h2 className="text-sm font-semibold text-gray-600">{format(currentMonth, 'MMM yyyy')}</h2>
      <button type="button" onClick={onNextMonth} className="p-1 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
