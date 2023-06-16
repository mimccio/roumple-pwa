import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { ArchiveBoxIcon, TrashIcon } from '@heroicons/react/24/outline'
import { LinkIcon } from '@heroicons/react/24/solid'

import { MenuBtn } from './menu-btn'
import { CopyUrlToClipboard } from './copy-url-to-clipboard'
import { TW_COLOR_TEXT_400 } from '&/common/constants/tw-colors'

interface Props {
  onDelete?: () => void
  onArchive?: () => void
  onLinkNote?: () => void
  withCopyLink: boolean
}

export function ItemMenu({ onDelete, onArchive, onLinkNote, withCopyLink }: Props) {
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
            {withCopyLink && <CopyUrlToClipboard />}
            {onLinkNote && (
              <MenuBtn Icon={LinkIcon} handleClick={onLinkNote}>
                Link note
              </MenuBtn>
            )}
            {onArchive && (
              <MenuBtn Icon={ArchiveBoxIcon} handleClick={onArchive}>
                Archive
              </MenuBtn>
            )}
            {onDelete && (
              <MenuBtn color={TW_COLOR_TEXT_400.red} Icon={TrashIcon} handleClick={onDelete}>
                Delete
              </MenuBtn>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}