import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { AdjustmentsVerticalIcon, CheckIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'

import type { SortType } from '@/modules/task/types'
import { SORT_TYPES } from '@/modules/task/constants'
import { sortTypeAtom } from '@/modules/task/atoms'
import { MenuBtn } from './menu-btn'
import { ConfirmDeleteModale } from '@/common/components/modales'
import { useDeleteAllDoneTasks } from '@/modules/task/hooks'

interface Props {
  handleSortChange: (sortType: SortType) => void
}

export function TasksMenu({ handleSortChange }: Props) {
  const { t } = useTranslation(['action', 'task'])
  const [sortType] = useAtom(sortTypeAtom)
  const { open, close, isOpen, onDelete } = useDeleteAllDoneTasks()

  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button className="flex h-full items-center justify-center rounded-md p-1 text-gray-400 transition-colors  hover:text-gray-500 focus:outline-none disabled:cursor-wait">
        <span className="sr-only">{t('openOptions', { ns: 'action' })}</span>
        <EllipsisHorizontalIcon width={24} aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 origin-top-left rounded-md bg-gray-50 shadow-sm ring-1 ring-gray-400 ring-opacity-20 focus:outline-none">
          <div className="py-1 ">
            <MenuBtn Icon={AdjustmentsVerticalIcon} handleClick={() => handleSortChange(SORT_TYPES.date)}>
              {t('sortByDate', { ns: 'action' })}
              {sortType === SORT_TYPES.date && <CheckIcon height={20} className="text-green-500" />}
            </MenuBtn>
            <MenuBtn Icon={AdjustmentsVerticalIcon} handleClick={() => handleSortChange(SORT_TYPES.priority)}>
              {t('sortByPriority', { ns: 'action' })}
              {sortType === SORT_TYPES.priority && <CheckIcon height={20} className="text-green-500" />}
            </MenuBtn>
            <MenuBtn Icon={AdjustmentsVerticalIcon} handleClick={() => handleSortChange(SORT_TYPES.name)}>
              {t('sortByName', { ns: 'action' })}
              {sortType === SORT_TYPES.name && <CheckIcon height={20} className="text-green-500" />}
            </MenuBtn>
            <MenuBtn Icon={TrashIcon} handleClick={open}>
              {t('clearDone', { ns: 'action' })}
            </MenuBtn>
          </div>
        </Menu.Items>
      </Transition>
      <ConfirmDeleteModale
        isOpen={isOpen}
        close={close}
        onDelete={onDelete}
        title={t('clearDoneTasks', { ns: 'task' })}
        description={t('confirmDeleteAllDoneTasks', { ns: 'task' })}
      />
    </Menu>
  )
}
