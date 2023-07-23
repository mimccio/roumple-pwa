import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { addWeeks, subWeeks, isThisWeek } from 'date-fns'
import { Popover, Transition } from '@headlessui/react'

import { SCHEDULE_TYPES } from '&/common/constants'
import { WeekCalendar } from '&/common/components/calendars'
import { useDateText } from '&/modules/task/hooks'
import { CalendarBtn } from './calendar-btn'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function WeekDateBtn({ date, onSelectDate }: Props) {
  const dateToFormat = new Date(date)
  const { getWeekDateText } = useDateText()

  return (
    <div className="flex justify-center gap-x-2">
      <button
        disabled={isThisWeek(dateToFormat)}
        onClick={() => onSelectDate(subWeeks(dateToFormat, 1))}
        className="p-1 text-sky-500 transition-colors hover:text-sky-600 disabled:text-gray-300"
      >
        <ChevronLeftIcon height={16} />
      </button>

      <Popover className="relative">
        <Popover.Button className="w-44 rounded-md bg-sky-500 px-4 py-1 text-sm font-semibold lowercase text-white transition-colors hover:bg-sky-600">
          {getWeekDateText(dateToFormat)}
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="absolute -left-24 -top-12 z-10 rounded-lg border bg-white p-2 shadow-md">
            {({ close }) => (
              <>
                <WeekCalendar date={date} onSelectDate={onSelectDate} />
                <CalendarBtn close={close} scheduleType={SCHEDULE_TYPES.weekly} />
              </>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>

      <button
        onClick={() => onSelectDate(addWeeks(dateToFormat, 1))}
        className="p-1 text-sky-500 transition-colors hover:text-sky-600"
      >
        <ChevronRightIcon height={16} />
      </button>
    </div>
  )
}
