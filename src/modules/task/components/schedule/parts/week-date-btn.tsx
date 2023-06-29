import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { format, isThisWeek, isSameWeek, addWeeks, subWeeks, startOfWeek, endOfWeek, startOfToday } from 'date-fns'

import { SCHEDULE_TYPES } from '&/common/constants'
import { WeekCalendar } from '&/common/components/calendars/week-calendar'
import { CalendarModale } from './calendar-modale'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function WeekDateBtn({ date, onSelectDate }: Props) {
  const [dateSelectorIsOpen, setDateSelectorIsOpen] = useState(false)

  const getButtonText = () => {
    if (isThisWeek(date)) return 'this week'
    if (isSameWeek(date, addWeeks(startOfToday(), 1))) return 'next week'
    const start = format(startOfWeek(date), 'dd MMM')
    const end = format(endOfWeek(date), 'dd MMM yy')
    return `${start} - ${end}`
  }

  return (
    <div className="flex justify-center gap-x-2">
      <button
        disabled={isThisWeek(date)}
        onClick={() => onSelectDate(subWeeks(date, 1))}
        className="p-1 text-sky-500 transition-colors hover:text-sky-600 disabled:text-gray-300"
      >
        <ChevronLeftIcon height={16} />
      </button>
      <button
        onClick={() => setDateSelectorIsOpen(true)}
        className="w-44 rounded-md bg-sky-500 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
      >
        {getButtonText()}
      </button>
      <button
        onClick={() => onSelectDate(addWeeks(date, 1))}
        className="p-1 text-sky-500 transition-colors hover:text-sky-600"
      >
        <ChevronRightIcon height={16} />
      </button>
      <CalendarModale
        isOpen={dateSelectorIsOpen}
        onClose={() => setDateSelectorIsOpen(false)}
        scheduleType={SCHEDULE_TYPES.daily}
      >
        <WeekCalendar date={date} onSelectDate={onSelectDate} />
      </CalendarModale>
    </div>
  )
}
