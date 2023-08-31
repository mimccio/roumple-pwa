import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'

import { cl, getScheduleTypeBg, getScheduleTypeIconColor, isPassed } from '&/common/utils'
import { usePeriodText } from '&/common/hooks'
import type { Task } from '&/modules/task/types'
import { useDateText, useTaskSchedule } from '&/modules/task/hooks'
import { TaskSchedule } from '&/modules/task/components'

interface Props {
  task: Task
}

export function Schedule({ task }: Props) {
  const { onSelectPeriod, onSelectDate, onSubmit, scheduleType, period, date, reset } = useTaskSchedule(task)
  const { getDateText } = useDateText()
  const { getPeriodText } = usePeriodText()
  const periodText = task.scheduleType && getPeriodText({ scheduleType: task.scheduleType, period: task.period })

  const scheduleColor = isPassed({ date, scheduleType }) ? 'text-red-400' : getScheduleTypeIconColor(task.scheduleType)
  const btnBg = getScheduleTypeBg(scheduleType)

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="group flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="flex items-center gap-2">
            <CalendarDaysIcon height={18} className={cl('transition-colors', scheduleColor)} />
            <span
              className={cl(
                'font-semibold  transition-colors ',
                task.scheduleType
                  ? 'text-gray-500 group-hover:text-gray-600'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            >
              {getDateText(task)}
            </span>
            <span className="text-gray-400">{periodText && `(${periodText})`}</span>
          </p>
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
                  cancel
                </button>
                <button
                  className={cl('rounded-md p-1 px-2 text-white transition-colors', btnBg)}
                  onClick={() => {
                    close()
                    onSubmit()
                  }}
                >
                  save
                </button>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
