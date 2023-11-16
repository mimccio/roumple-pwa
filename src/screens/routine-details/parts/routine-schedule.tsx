import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'
import { ClockIcon } from '@heroicons/react/24/solid'
import { ClockIcon as ClockOutlineIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { usePeriodText } from '&/common/hooks'
import { cl } from '&/common/utils'
import { RoutineScheduleSelector } from '&/common/components/inputs/routine-schedule-selector'
import type { Routine } from '&/modules/routine/types'
import {
  getIsScheduled,
  getScheduleTypeBgColor,
  getScheduleTypeBorderColor,
  getScheduleTypeColor,
} from '&/modules/routine/utils'
import { useSchedule } from '&/modules/routine/hooks'

interface Props {
  routine: Routine
  date: Date
}

export function RoutineSchedule({ routine, date }: Props) {
  const { t } = useTranslation(['common', 'action', 'schedule'])
  const { getPeriodText } = usePeriodText()
  const periodText = getPeriodText({ scheduleType: routine.scheduleType, period: routine.period })
  const scheduleColor = getScheduleTypeColor(routine.scheduleType)
  const isScheduled = getIsScheduled({ routine, date })
  const bg = isScheduled ? getScheduleTypeBgColor(routine.scheduleType) : 'bg-gray-50'
  const border = isScheduled ? getScheduleTypeBorderColor(routine.scheduleType) : 'border-gray-200'

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
      <Popover.Button
        className={cl(
          'group relative flex w-full cursor-pointer items-center justify-between border-y px-4 py-1 text-left transition-all hover:opacity-75',
          border,
          bg
        )}
      >
        <span className="flex items-center">
          {isScheduled ? (
            <ClockIcon className={cl('w-4 transition-colors', scheduleColor)} />
          ) : (
            <ClockOutlineIcon className={cl('w-4 text-gray-300 transition-colors')} />
          )}

          <span
            className={cl(
              'ml-3 block truncate text-sm   transition-colors ',
              isScheduled ? scheduleColor : 'text-gray-300'
            )}
          >
            {periodText}
          </span>
        </span>
        <ChevronDownIcon className={cl('w-4 opacity-30', isScheduled ? scheduleColor : 'text-gray-400')} />
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
        <Popover.Panel className="absolute left-1 right-1 z-10 mt-1 max-w-lg rounded-lg bg-gray-50 p-4 shadow-md">
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
                  {t('save', { ns: 'action' })}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick={() => close()}
                >
                  {t('cancel', { ns: 'action' })}
                </button>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
