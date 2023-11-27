import { addMonths, isThisMonth, subMonths } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '@/common/constants'
import { useDateText } from '@/modules/task/hooks'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function MonthDateBtn({ date, onSelectDate }: Props) {
  const { getDateText } = useDateText()

  return (
    <div className="flex justify-center gap-x-2">
      <button
        disabled={isThisMonth(date)}
        onClick={() => onSelectDate(subMonths(date, 1))}
        className="p-1 text-purple-500 transition-colors hover:text-purple-600 disabled:text-gray-300"
      >
        <ChevronLeftIcon height={16} />
      </button>
      <p className="flex w-40 justify-center rounded-md bg-purple-500 px-4 py-1 text-sm font-semibold lowercase text-white">
        {getDateText({ scheduleType: SCHEDULE_TYPES.monthly, date })}
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
