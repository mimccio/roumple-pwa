import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { format, getWeek } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { TW_COLOR_BG_200_HOVER } from '&/common/constants/tw-colors'
import { cl, getDateFnsLocale, getTwBgColor } from '&/common/utils'
import type { Routine } from '&/modules/routine/types'
import { getScheduledRoutines } from '../utils/get-scheduled-routines'

interface Props {
  scheduleType?: ScheduleType
  date?: Date
  onClose: () => void
  routines: Routine[]
}

export function PlaningModale({ scheduleType, date, onClose, routines }: Props) {
  const { t } = useTranslation('schedule')

  const getDateText = () => {
    if (!date) return null
    if (scheduleType === SCHEDULE_TYPES.daily)
      return format(new Date(date), 'dd MMM yyyy', { locale: getDateFnsLocale() })
    if (scheduleType === SCHEDULE_TYPES.weekly) return t('week') + ' ' + getWeek(new Date(date))
    if (scheduleType === SCHEDULE_TYPES.monthly)
      return format(new Date(date), 'MMMM yyyy', { locale: getDateFnsLocale() })
  }

  const dateText = getDateText()

  return (
    <Transition.Root show={Boolean(date)} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:p-6">
                <Dialog.Title className="font-semibold text-gray-700">{dateText}</Dialog.Title>
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <ol className="mb-2 mt-2 flex flex-col gap-y-1 overflow-y-scroll">
                  {date &&
                    getScheduledRoutines({ routines, date, type: scheduleType }).map((routine) => {
                      const color = routine.category?.color || 'gray'
                      return (
                        <li key={routine.id}>
                          <Link
                            to={`/routines/d/routine/${routine.id}`}
                            state={{ date }}
                            className={cl(
                              'block w-full truncate rounded-sm px-2 py-1 text-left text-sm font-medium text-gray-700 transition-colors hover:text-gray-900',
                              getTwBgColor(100, color),
                              TW_COLOR_BG_200_HOVER[color]
                            )}
                          >
                            {routine.name}
                          </Link>
                        </li>
                      )
                    })}
                </ol>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
