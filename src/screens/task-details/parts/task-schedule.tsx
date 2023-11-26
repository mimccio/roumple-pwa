import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { cl, getScheduleTypeBg, getScheduleTypeIconColor, isPassed } from '&/common/utils'
import { usePeriodText } from '&/common/hooks'

import type { Task } from '&/modules/task/types'
import { getScheduleTypeBgColor, getScheduleTypeBorderColor } from '&/modules/routine/utils'
import { useDateText, useTaskSchedule } from '&/modules/task/hooks'
import { TaskSchedule } from '&/modules/task/components'

interface Props {
  task: Task
}

export function Schedule({ task }: Props) {
  const { t } = useTranslation('action')
  const { onSelectPeriod, onSelectDate, onSubmit, scheduleType, period, date, reset } = useTaskSchedule(task)
  const { getDateText } = useDateText()
  const { getPeriodText } = usePeriodText()
  const periodText = task.scheduleType && getPeriodText({ scheduleType: task.scheduleType, period: task.period })

  const scheduleColor = isPassed({ date, scheduleType }) ? 'text-red-400' : getScheduleTypeIconColor(task.scheduleType)
  const btnBg = getScheduleTypeBg(scheduleType)

  const getBg = () => {
    if (isPassed({ date, scheduleType })) return 'bg-red-50'
    if (!task.scheduleType) return 'bg-gray-50'
    return getScheduleTypeBgColor(task.scheduleType)
  }

  const getBorderColor = () => {
    if (isPassed({ date, scheduleType })) return 'border-red-200'
    if (!task.scheduleType) return 'border-gray-200'
    return getScheduleTypeBorderColor(task.scheduleType)
  }

  return (
    <Popover className="relative">
      <Popover.Button
        className={cl(
          'group flex w-full  items-center justify-between gap-x-4 gap-y-1 border-y px-4 py-1 text-sm transition-all hover:opacity-75',
          getBg(),
          getBorderColor(),
          scheduleColor
        )}
      >
        <p className="flex flex-wrap items-center gap-x-8 gap-y-1">
          <span className="flex items-center gap-x-2">
            <CalendarDaysIcon height={14} className={cl(' transition-colors', scheduleColor)} />
            {getDateText(task)}
          </span>
          {periodText && (
            <span className="flex items-center gap-x-2">
              <ClockIcon height={14} className={cl('transition-colors', scheduleColor)} /> {periodText}
            </span>
          )}
        </p>
        <ChevronDownIcon className={cl('w-4 opacity-30', scheduleColor)} />
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
        <Popover.Panel className="absolute left-1 right-1 z-10 mt-1 w-full max-w-lg rounded-lg bg-white p-4 shadow-md">
          {({ close }) => (
            <div>
              <TaskSchedule
                scheduleType={scheduleType}
                period={period}
                date={date}
                onSelectPeriod={onSelectPeriod}
                onSelectDate={onSelectDate}
              />
              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  className="rounded-md border p-1 px-2 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-600"
                  onClick={() => {
                    close()
                    reset()
                  }}
                >
                  {t('cancel')}
                </button>
                <button
                  className={cl('rounded-md p-1 px-2 text-white transition-colors', btnBg)}
                  onClick={() => {
                    close()
                    onSubmit()
                  }}
                >
                  {t('save')}
                </button>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
