import { ClockIcon } from '@heroicons/react/24/outline'

import type { Routine } from '&/modules/routine/types'
import { getPeriodText, getScheduleTypeColor } from '&/modules/routine/utils'
import { Popover, Transition } from '@headlessui/react'
import { RoutineScheduleSelector } from '&/common/components/inputs/routine-schedule-selector'
import { useSchedule } from '&/modules/routine/hooks/use-schedule'
import { Fragment } from 'react'

interface Props {
  routine: Routine
  date: number
}

export function RoutineSchedule({ routine, date }: Props) {
  const periodText = getPeriodText({ type: routine.type, period: routine.period })
  const ScheduleColor = getScheduleTypeColor(routine.type)
  const {
    dailyRecurrence,
    currentPeriod,
    handlePeriodChange,
    currentType,
    handleRecurrenceChange,
    weeklyRecurrence,
    monthlyRecurrence,
    onSubmit,
  } = useSchedule({ routine, date })

  return (
    <Popover className="relative">
      <Popover.Button>
        <p className="items-center4 flex">
          <ClockIcon width={20} className={ScheduleColor} />
          <span className="ml-2 font-semibold text-gray-600">{periodText}</span>
        </p>
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
        <Popover.Panel className="absolute z-10 rounded-lg bg-gray-50 p-4 shadow-md">
          {({ close }) => (
            <div>
              <RoutineScheduleSelector
                dailyRecurrence={dailyRecurrence}
                currentPeriod={currentPeriod}
                handlePeriodChange={handlePeriodChange}
                weeklyRecurrence={weeklyRecurrence}
                monthlyRecurrence={monthlyRecurrence}
                currentType={currentType}
                handleRecurrenceChange={handleRecurrenceChange}
              />
              <div className="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className=" text-gra-700 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 sm:col-start-2"
                  onClick={() => {
                    onSubmit()
                    close()
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick={() => close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
