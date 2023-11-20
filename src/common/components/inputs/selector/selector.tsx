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
  ButtonIcon: ElementType
  defaultName?: string
  DefaultOptionIcon?: ElementType
  OptionIcon?: ElementType
}

export function Selector({
  item,
  options,
  isLoading,
  isError,
  onSelect,
  ButtonIcon,
  defaultName = 'none',
  DefaultOptionIcon,
  OptionIcon,
}: Props) {
  return (
    <div className="w-full">
      <Listbox disabled={isLoading || isError} value={item || { id: undefined, name: defaultName }} onChange={onSelect}>
        {({ open }) => (
          <div className="relative">
            <SelectorBtn
              item={item}
              Icon={ButtonIcon}
              isLoading={isLoading}
              isError={isError}
              defaultName={defaultName}
            />
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
              <Listbox.Options className="absolute left-1 right-1 z-10 mt-1 max-h-60 max-w-lg overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <SelectorOption
                  Icon={DefaultOptionIcon}
                  option={{ id: undefined, name: defaultName }}
                  selected={!item?.id}
                />

                {options?.map((option) => (
                  <SelectorOption Icon={OptionIcon} key={option.id} option={option} selected={option.id === item?.id} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}
