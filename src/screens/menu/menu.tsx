import { Transition } from '@headlessui/react'
import { MenuContent } from './menu-content'

interface Props {
  isOpen: boolean
  close: () => void
}

export function Menu({ isOpen, close }: Props) {
  return (
    <>
      <Transition
        show={isOpen}
        className="absolute bottom-0 left-0 right-0 top-0 z-40 shadow-lg md:hidden"
        enter="transition ease-in-out duration-300 transform  md:duration-0"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <MenuContent close={close} />
      </Transition>
      <div className="hidden h-screen border-r md:block md:w-80">
        <MenuContent close={() => null} />
      </div>
    </>
  )
}
