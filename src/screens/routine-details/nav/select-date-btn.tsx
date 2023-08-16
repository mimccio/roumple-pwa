import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'

import type { ScheduleType } from '&/common/types'
import { Tooltip } from '&/common/components/tooltip'
import { CalendarBtn, DayCalendar, WeekCalendar } from '&/common/components/calendars'
import { SCHEDULE_TYPES } from '&/common/constants'

interface Props {
  date: Date
  handleDateChange: (date: Date) => void
  scheduleType: ScheduleType
}

export function SelectDateBtn({ handleDateChange, date, scheduleType }: Props) {
  const { t } = useTranslation('action')

  if (scheduleType === SCHEDULE_TYPES.monthly) return null

  return (
    <div>
      <Popover>
        <Tooltip message={t('selectDate')}>
          <Popover.Button className="group flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors hover:border-gray-200">
            <CalendarDaysIcon className="h-5 w-5  text-gray-400 group-hover:text-gray-500" />
          </Popover.Button>
        </Tooltip>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="absolute left-1/2 top-12 z-10 -translate-x-1/2 rounded-lg border bg-white p-2 shadow-md">
            {({ close }) => (
              <>
                {scheduleType === SCHEDULE_TYPES.daily && (
                  <DayCalendar noFuture pastLimit={2} date={date} onSelectDate={handleDateChange} />
                )}
                {scheduleType === SCHEDULE_TYPES.weekly && (
                  <WeekCalendar noFuture date={date} onSelectDate={handleDateChange} />
                )}
                <CalendarBtn close={close} scheduleType={scheduleType} />
              </>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
