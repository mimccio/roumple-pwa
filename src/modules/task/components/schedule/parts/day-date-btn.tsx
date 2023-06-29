import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { format, isToday, isTomorrow, sub, add } from 'date-fns'
import { CalendarModale } from './calendar-modale'
import { useState } from 'react'
import { SCHEDULE_TYPES } from '&/common/constants'
import { DayCalendar } from '&/common/components/calendars/day-calendar'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function DayDateBtn({ date, onSelectDate }: Props) {
  const [dateSelectorIsOpen, setDateSelectorIsOpen] = useState(false)

  const getButtonText = () => {
    if (isToday(date)) return 'today'
    if (isTomorrow(date)) return 'tomorrow'
    return format(date, 'dd MMM yy')
  }

  return (
    <div className="flex justify-center gap-x-2">
      <button
        disabled={isToday(date)}
        onClick={() => onSelectDate(sub(date, { days: 1 }))}
        className="p-1 text-indigo-500 transition-colors hover:text-indigo-600 disabled:text-gray-300"
      >
        <ChevronLeftIcon height={16} />
      </button>
      <button
        onClick={() => setDateSelectorIsOpen(true)}
        className="w-28 rounded-md bg-indigo-500 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
      >
        {getButtonText()}
      </button>
      <button
        onClick={() => onSelectDate(add(date, { days: 1 }))}
        className="p-1 text-indigo-500 transition-colors hover:text-indigo-600"
      >
        <ChevronRightIcon height={16} />
      </button>
      <CalendarModale
        isOpen={dateSelectorIsOpen}
        onClose={() => setDateSelectorIsOpen(false)}
        scheduleType={SCHEDULE_TYPES.daily}
      >
        <DayCalendar date={date} onSelectDate={onSelectDate} />
      </CalendarModale>
    </div>
  )
}
