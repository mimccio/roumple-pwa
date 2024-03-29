import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { ArrowPathRoundedSquareIcon, LinkIcon } from '@heroicons/react/24/solid'

import { MenuBtn } from './menu-btn'
import { CopyUrlToClipboard } from './copy-url-to-clipboard'
import { TW_COLOR_TEXT_400 } from '&/common/constants/tw-colors'
import { cl } from '&/common/utils'

interface Props {
  onDelete?: () => void
  onArchive?: () => void
  onLinkNote?: () => void
  onEditOccurrence?: () => void
  onToggleShowChecklist?: () => void

  withCopyLink?: boolean
  isLoading?: boolean
  isArchived?: boolean
  disabled?: boolean
  checklistIsDisplayed?: boolean
}

export function ItemMenu({
  onDelete,
  onArchive,
  onLinkNote,
  onToggleShowChecklist,
  withCopyLink = false,
  isLoading = false,
  isArchived,
  checklistIsDisplayed,
  onEditOccurrence,
  disabled,
}: Props) {
  const { t } = useTranslation('action')

  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button
          disabled={disabled || isLoading}
          className={cl(
            'flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-gray-400 transition-colors hover:border-gray-200 hover:text-gray-500 focus:outline-none disabled:text-gray-200 disabled:hover:border-transparent disabled:hover:text-gray-200',
            isLoading ? 'disabled:cursor-wait' : 'disabled:cursor-default'
          )}
        >
          <span className="sr-only">{t('openOptions')}</span>
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
        <Menu.Items className="absolute right-2 top-12 z-10 w-56 origin-top-right rounded-md bg-gray-50 shadow-sm ring-1 ring-gray-400 ring-opacity-20 focus:outline-none">
          <div className="py-1">
            {withCopyLink && <CopyUrlToClipboard />}
            {onToggleShowChecklist && (
              <MenuBtn Icon={checklistIsDisplayed ? EyeSlashIcon : EyeIcon} handleClick={onToggleShowChecklist}>
                {t(checklistIsDisplayed ? 'Hide checklist' : 'Show checklist')}
              </MenuBtn>
            )}
            {onLinkNote && (
              <MenuBtn Icon={LinkIcon} handleClick={onLinkNote}>
                {t('linkNote')}
              </MenuBtn>
            )}
            {onEditOccurrence && (
              <MenuBtn Icon={ArrowPathRoundedSquareIcon} handleClick={onEditOccurrence}>
                {t('editOccurrence')}
              </MenuBtn>
            )}
            {onArchive && (
              <MenuBtn Icon={isArchived ? ArchiveBoxXMarkIcon : ArchiveBoxIcon} handleClick={onArchive}>
                {isArchived ? t('unArchive') : t('archive')}
              </MenuBtn>
            )}
            {onDelete && (
              <MenuBtn color={TW_COLOR_TEXT_400.red} Icon={TrashIcon} handleClick={onDelete}>
                {t('delete')}
              </MenuBtn>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
