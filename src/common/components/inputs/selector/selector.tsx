import { Fragment } from 'react'
import type { ElementType } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { SelectorOption } from './parts/selector-option'
import { SelectorBtn } from './parts/selector-btn'

interface Props {
  options?: { id: string; name: string }[]
  item?: { id: string; name: string } | null
  isLoading: boolean
  isError: boolean
  onSelect: (item: { id: string; name: string }) => void
  Icon: ElementType
}

export function Selector({ item, options, isLoading, isError, onSelect, Icon }: Props) {
  return (
    <div className="w-full">
      <Listbox disabled={isLoading || isError} value={item || { id: null, name: 'none' }} onChange={onSelect}>
        {({ open }) => (
          <div className="relative">
            <SelectorBtn item={item} Icon={Icon} isLoading={isLoading} isError={isError} />
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full max-w-lg overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <SelectorOption option={{ id: null, name: 'none' }} selected={item?.id == null} />

                {options?.map((option) => (
                  <SelectorOption key={option.id} option={option} selected={option.id === item?.id} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}
