import { cl } from '&/common/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { format, isSameMonth } from 'date-fns'

interface Props {
  date: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
  onThisMonth: () => void
  today: Date
}

export function PlaningHeader({ date, onPreviousMonth, onNextMonth, today, onThisMonth }: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 lg:flex-none">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="flex items-center justify-center rounded-md border p-2 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 "
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        disabled={isSameMonth(date, today)}
        onClick={onThisMonth}
        className={cl(
          'font-semibold transition-colors',
          isSameMonth(date, today) ? 'text-gray-500' : 'text-purple-700 hover:text-purple-500'
        )}
      >
        {format(date, 'MMMM yyyy')}
      </button>

      <button
        type="button"
        onClick={onNextMonth}
        className="flex items-center justify-center rounded-md border p-2 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 "
      >
        <span className="sr-only">Previous month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </header>
  )
}
