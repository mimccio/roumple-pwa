import type { ReactNode } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'

interface Props {
  isOpen: boolean
  children: ReactNode
  scheduleType: ScheduleType
  onClose: () => void
}

export function CalendarModale({ isOpen, children, scheduleType, onClose }: Props) {
  const btnColor =
    scheduleType === SCHEDULE_TYPES.weekly ? 'bg-sky-500 hover:bg-sky-600' : 'bg-indigo-500 hover:bg-indigo-600'

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
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
          <div className="flex min-h-full items-center justify-center p-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative flex transform flex-col gap-y-4 rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 md:max-w-2xl md:px-8">
                {children}
                <div className="flex justify-end gap-x-4 p-2">
                  <button
                    onClick={onClose}
                    className={cl(
                      'rounded-md border px-3 py-1 text-gray-50 transition-colors hover:text-white ',
                      btnColor
                    )}
                  >
                    ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
