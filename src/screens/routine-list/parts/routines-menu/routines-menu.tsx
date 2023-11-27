import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'
import { AdjustmentsVerticalIcon, CheckIcon, EllipsisHorizontalIcon, QueueListIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'

import type { SortType } from '@/modules/routine/types'
import { SORT_TYPES } from '@/modules/routine/constants'
import { routineGroupByScheduleAtom, routineSortTypeAtom } from '@/modules/routine/atoms'
import { MenuBtn } from './menu-btn'

interface Props {
  handleSortChange: (sortType: SortType) => void
  handleGroupBySchedule: () => void
}

export function RoutinesMenu({ handleSortChange, handleGroupBySchedule }: Props) {
  const { t } = useTranslation('action')
  const [sortType] = useAtom(routineSortTypeAtom)
  const [isGroupedBySchedule] = useAtom(routineGroupByScheduleAtom)

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
        <Menu.Items className="absolute right-0 z-10 w-64 origin-top-left rounded-md bg-gray-50 shadow-sm ring-1 ring-gray-400 ring-opacity-20 focus:outline-none">
          <div className="py-1 ">
            <MenuBtn Icon={AdjustmentsVerticalIcon} handleClick={() => handleSortChange(SORT_TYPES.priority)}>
              {t('sortByPriority', { ns: 'action' })}
              {sortType === SORT_TYPES.priority && <CheckIcon height={20} className="text-green-500" />}
            </MenuBtn>
            <MenuBtn Icon={AdjustmentsVerticalIcon} handleClick={() => handleSortChange(SORT_TYPES.name)}>
              {t('sortByName', { ns: 'action' })}
              {sortType === SORT_TYPES.name && <CheckIcon height={20} className="text-green-500" />}
            </MenuBtn>
            <MenuBtn Icon={QueueListIcon} handleClick={handleGroupBySchedule}>
              {t(isGroupedBySchedule ? 'unGroupBySchedule' : 'groupBySchedule', { ns: 'action' })}
            </MenuBtn>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
