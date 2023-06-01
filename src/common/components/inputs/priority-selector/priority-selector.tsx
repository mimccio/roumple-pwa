import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { PriorityButton, PriorityItem } from './parts'

interface Props {
  priority: number
  onSelect: (priority: number) => void
}

export function PrioritySelector({ onSelect, priority }: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <PriorityButton priority={priority} />
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
        <Menu.Items className="absolute right-12 top-0 z-10 origin-right rounded-md bg-gray-50 shadow-lg">
          <div className="flex gap-1 p-1">
            <PriorityItem priority={0} onSelect={onSelect} />
            <PriorityItem priority={1} onSelect={onSelect} />
            <PriorityItem priority={2} onSelect={onSelect} />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
