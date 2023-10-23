import { SyncLoader } from 'react-spinners'
import { SPINNER_COLOR_LIGHT } from '&/common/constants'
import { Transition } from '@headlessui/react'

interface Props {
  text?: string
  isLoading: boolean
}

export function SyncSpinner({ text, isLoading }: Props) {
  return (
    <Transition
      as="div"
      appear
      show={isLoading}
      className="flex flex-col items-center justify-center gap-y-12 py-16"
      enter="transition ease-in-out duration-1000 delay-100"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-1"
      leave="transition ease-linear duration-50"
      leaveFrom="opacity-100 scale-1"
      leaveTo="opacity-0 scale-0"
    >
      {text && <p className="max-w-xs px-2 text-center text-gray-400">{text}</p>}
      <SyncLoader
        color={SPINNER_COLOR_LIGHT}
        loading
        size={16}
        aria-label="Loading Spinner"
        data-testid="fetching loader"
        margin={5}
        speedMultiplier={0.7}
      />
    </Transition>
  )
}
