import { RingLoader } from 'react-spinners'
import { Transition } from '@headlessui/react'
import { SPINNER_COLOR } from '../constants'

export function DetailsLoadingPage() {
  return (
    <div>
      <div className="flex h-14 w-full items-center justify-between bg-gray-200 px-4 text-gray-400" />

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
