import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import { cl } from '@/common/utils'

interface Props {
  onDelete?: () => void
  onRename?: () => void
}

export function FolderMenu({ onDelete, onRename }: Props) {
  const { t } = useTranslation('action')
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors  hover:text-gray-500 focus:outline-none">
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
        <Menu.Items className="absolute right-10 top-0 z-10 flex origin-right flex-col gap-y-1 rounded-md bg-gray-50 py-2 shadow-sm ring-1 ring-gray-400 ring-opacity-20 focus:outline-none">
          {onRename && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onRename}
                  className={cl(
                    'flex w-full items-center gap-3 font-semibold transition-colors',
                    active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                    'block px-4 py-1 text-xs'
                  )}
                >
                  <PencilIcon height={12} className="text-gray-300" /> {t('rename', { ns: 'action' })}
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
                    'flex w-full items-center gap-3 font-semibold transition-colors',
                    active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                    'block px-4 py-1 text-xs'
                  )}
                >
                  <TrashIcon height={12} className="text-red-300" /> {t('delete', { ns: 'action' })}
                </button>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
