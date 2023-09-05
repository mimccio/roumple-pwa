import type { ReactNode } from 'react'
import { Disclosure as TwDisclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { cl } from '../utils'
import { TW_BOARD_BG_COLORS, TW_BOARD_TEXT_COLORS_400, TW_BOARD_TEXT_COLORS_700 } from '../constants'

interface Props {
  title?: string
  children: ReactNode
  color: 'indigo' | 'sky' | 'purple'
}

export function Disclosure({ title, children, color }: Props) {
  return (
    <TwDisclosure defaultOpen>
      {({ open }) => (
        <>
          <TwDisclosure.Button
            className={cl(
              'flex w-full gap-4 rounded-lg p-2 pl-1 text-left text-sm font-bold transition-colors focus:outline-none xl:px-4',
              TW_BOARD_BG_COLORS[color],
              TW_BOARD_TEXT_COLORS_700[color]
            )}
          >
            <ChevronUpIcon
              className={cl('h-5 w-5', open ? 'rotate-180 transform' : '', TW_BOARD_TEXT_COLORS_400[color])}
            />
            {title}
          </TwDisclosure.Button>

          <Transition
            show={open}
            enter="transition duration-250 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-250 ease-out"
            leaveFrom="transform scale-y-100 opacity-100"
            leaveTo="transform scale-y-0 opacity-0"
            className="origin-top"
          >
            <TwDisclosure.Panel className="flex flex-col gap-4 py-4">{children}</TwDisclosure.Panel>
          </Transition>
        </>
      )}
    </TwDisclosure>
  )
}
