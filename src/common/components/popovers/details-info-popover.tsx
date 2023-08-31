import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'

interface Props {
  buttonContent: ReactNode
  children: ReactNode
}

export function DetailsInfoPopover({ buttonContent, children }: Props) {
  const { t } = useTranslation('action')

  return (
    <Popover className="flex">
      <Popover.Button className="text-lg font-bold text-gray-500 transition-colors group-hover:text-gray-600">
        {buttonContent}
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
        <Popover.Panel className="absolute left-2 right-2 z-10 mt-8">
          {({ close }) => (
            <div className="mb-12 rounded-lg bg-white p-4 shadow-md">
              {children}
              <div className="mt-4 flex justify-end">
                <button
                  className="rounded-lg border px-2 py-1 text-xs text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-600"
                  onClick={() => close()}
                >
                  {t('close')}
                </button>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
