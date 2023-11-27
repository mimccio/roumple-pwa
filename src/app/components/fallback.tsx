import { SPINNER_COLOR } from '@/common/constants'
import { Transition } from '@headlessui/react'
import { GridLoader } from 'react-spinners'

export function Fallback() {
  return (
    <div className="h-screen bg-gray-100 pt-[40vh]">
      <Transition
        as="div"
        appear
        show
        className="flex origin-center justify-center "
        enter="transition ease-in-out duration-1000 delay-300"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-1"
        leave="transition ease-linear duration-50"
        leaveFrom="opacity-100 scale-1"
        leaveTo="opacity-0 scale-0"
      >
        <GridLoader
          aria-label="Loading Spinner"
          className="opacity-50"
          color={SPINNER_COLOR}
          data-testid="loading spinner"
          loading
          margin={8}
          size={20}
          speedMultiplier={0.8}
        />
      </Transition>
    </div>
  )
}
