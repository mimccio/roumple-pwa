import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ClockIcon } from '@heroicons/react/24/solid'
import { ClockIcon as ClockOutlineIcon } from '@heroicons/react/24/outline'

import { cl } from '&/common/utils'
import { RoutineScheduleSelector } from '&/common/components/inputs/routine-schedule-selector'
import type { Routine } from '&/modules/routine/types'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'
import { getIsScheduled, getPeriodText, getScheduleTypeColor, getScheduleTypeLightColor } from '&/modules/routine/utils'
import { useSchedule } from '&/modules/routine/hooks/use-schedule'

interface Props {
  routine: Routine
  date: number
}

export function RoutineSchedule({ routine, date }: Props) {
  const periodText = getPeriodText({ type: routine.type, period: routine.period })
  const scheduleColor = getScheduleTypeColor(routine.type)
  const isScheduledColor = getScheduleTypeLightColor(routine.type)
  const isScheduled = getIsScheduled({ routine, date })
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

  const getIsScheduledText = () => {
    if (routine.type === SCHEDULE_TYPES.monthly) return 'this month'
    if (routine.type === SCHEDULE_TYPES.weekly) return 'this week'
    return 'today'
  }
  const scheduledText = getIsScheduledText()

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="group flex flex-wrap items-center gap-4">
          <p className="flex items-center gap-2">
            {isScheduled ? (
              <ClockIcon width={20} height={20} className={cl('transition-colors', scheduleColor)} />
            ) : (
              <ClockOutlineIcon width={20} height={20} className={cl('transition-colors', scheduleColor)} />
            )}
            <span className="font-semibold text-gray-500 transition-colors group-hover:text-gray-600">
              {periodText}
            </span>
          </p>
          {!isScheduled && (
            <p className="text-sm text-gray-300 transition-colors group-hover:text-gray-400">
              Not scheduled for {scheduledText}
            </p>
          )}
          {isScheduled && (
            <p className={cl('ml-2 text-sm transition-colors', isScheduledColor)}>Scheduled for {scheduledText}</p>
          )}
        </div>
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
        <Popover.Panel className="absolute z-10 w-full max-w-lg rounded-lg bg-white p-4 shadow-md">
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
