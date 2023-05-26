import type { ReactNode } from 'react'
import { Disclosure as TwDisclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { cl } from '../utils'

interface Props {
  title?: string
  children: ReactNode
  color: string
}

export function Disclosure({ title, children, color }: Props) {
  const bg = `hover:bg-${color}-100 bg-${color}-50`
  const textColor = `text-${color}-700`
  const arrowColor = `text-${color}-400`

  return (
    <TwDisclosure defaultOpen>
      {({ open }) => (
        <>
          <TwDisclosure.Button
            className={cl(
              'flex w-full gap-4 rounded-lg p-2 pl-1 text-left text-sm font-bold transition-colors focus:outline-none xl:px-4',
              bg,
              textColor
            )}
          >
            <ChevronUpIcon className={cl('h-5 w-5', open ? 'rotate-180 transform' : '', arrowColor)} />
            {title}
          </TwDisclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <TwDisclosure.Panel className="flex flex-col gap-4 py-4">{children}</TwDisclosure.Panel>
          </Transition>
        </>
      )}
    </TwDisclosure>
  )
}
