import { SPINNER_COLOR } from '&/common/constants'
import { Transition } from '@headlessui/react'
import { RingLoader } from 'react-spinners'

export function Fallback() {
  return (
    <div className="h-screen bg-gray-100 ">
      <Transition
        as="div"
        appear
        show
        className="flex justify-center pt-[40vh]"
        enter="transition ease-in-out duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <RingLoader
          color={SPINNER_COLOR}
          loading
          size={50}
          aria-label="Loading Spinner"
          data-testid="fetching loader"
        />
      </Transition>
    </div>
  )
}
