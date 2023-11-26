import { Fragment } from 'react'
import type { ElementType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Props {
  text: string
  children: ReactNode
  Icon?: ElementType
}

export function DetailsInfoPopover({ text, children, Icon }: Props) {
  const { t } = useTranslation('action')

  return (
    <Popover>
      <Popover.Button className="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-1 text-left text-sm transition-all hover:opacity-75">
        <div className="flex items-center">
          {Icon && <Icon height={14} width={14} className="mr-3 text-gray-400" />}
          <span className="block truncate font-semibold text-gray-500 transition-colors">{text}</span>
        </div>
        <ChevronDownIcon className="w-4 text-gray-200" />
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
        <Popover.Panel className="absolute left-1 right-1 z-10 mt-1 max-w-lg ">
          {({ close }) => (
            <div className="mb-12 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
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
