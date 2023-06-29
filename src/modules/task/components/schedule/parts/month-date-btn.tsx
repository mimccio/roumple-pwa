import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { addMonths, format, isSameMonth, isThisMonth, isThisWeek, startOfToday, subMonths } from 'date-fns'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function MonthDateBtn({ date, onSelectDate }: Props) {
  const getButtonText = () => {
    if (isThisMonth(date)) return 'this month'
    if (isSameMonth(date, addMonths(startOfToday(), 1))) return 'next month'
    return format(date, 'MMMM yy')
  }

  return (
    <div className="flex justify-center gap-x-2">
      <button
        disabled={isThisWeek(date)}
        onClick={() => onSelectDate(subMonths(date, 1))}
        className="p-1 text-purple-500 transition-colors hover:text-purple-600 disabled:text-gray-300"
      >
        <ChevronLeftIcon height={16} />
      </button>
      <p className="flex w-40 justify-center rounded-md bg-purple-500 px-4 py-1 text-sm font-semibold text-white">
        {getButtonText()}
      </p>
      <button
        onClick={() => onSelectDate(addMonths(date, 1))}
        className="p-1 text-purple-500 transition-colors hover:text-purple-600"
      >
        <ChevronRightIcon height={16} />
      </button>
    </div>
  )
}
