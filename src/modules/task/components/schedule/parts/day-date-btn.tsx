import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { isToday, addDays, subDays } from 'date-fns'
import { Popover, Transition } from '@headlessui/react'

import { DayCalendar } from '&/common/components/calendars'
import { getDayDateText } from '&/modules/task/utils'
import { CalendarBtn } from './calendar-btn'
import { SCHEDULE_TYPES } from '&/common/constants'

interface Props {
  date: Date
  onSelectDate: (date: Date) => void
}

export function DayDateBtn({ date, onSelectDate }: Props) {
  const dateToFormat = new Date(date)

  return (
    <div className="flex justify-center gap-x-2">
      <button
        disabled={isToday(dateToFormat)}
        onClick={() => onSelectDate(subDays(dateToFormat, 1))}
        className="p-1 text-indigo-500 transition-colors hover:text-indigo-600 disabled:text-gray-300"
      >
        <ChevronLeftIcon height={16} />
      </button>

      <Popover className="relative">
        <Popover.Button className="w-28 rounded-md bg-indigo-500 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-indigo-600">
          {getDayDateText(dateToFormat)}
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
          <Popover.Panel className=" absolute -left-24 -top-12 z-10 rounded-lg border bg-white p-2 shadow-md">
            {({ close }) => (
              <>
                <DayCalendar date={date} onSelectDate={onSelectDate} />
                <CalendarBtn close={close} scheduleType={SCHEDULE_TYPES.daily} />
              </>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>

      <button
        onClick={() => onSelectDate(addDays(dateToFormat, 1))}
        className="p-1 text-indigo-500 transition-colors hover:text-indigo-600"
      >
        <ChevronRightIcon height={16} />
      </button>
    </div>
  )
}
