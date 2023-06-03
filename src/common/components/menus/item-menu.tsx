import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { cl } from '&/common/utils'
import { ArchiveBoxIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  onDelete?: () => void
  onArchive?: () => void
}

export function ItemMenu({ onDelete, onArchive }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-500 focus:outline-none">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-2 z-10 mt-4 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {onArchive && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onArchive}
                    className={cl(
                      'flex w-full items-center gap-4',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <ArchiveBoxIcon className="h-4 text-gray-400" /> Archive
                  </button>
                )}
              </Menu.Item>
            )}
            {onDelete && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={cl(
                      'flex w-full items-center gap-4',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <TrashIcon className="h-4 text-red-400" /> Delete
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
