import { RiseLoader } from 'react-spinners'
import { Transition } from '@headlessui/react'
import { SPINNER_COLOR_LIGHT } from '../../constants'

interface Props {
  isLoading: boolean
}

export function LoadingSpinner({ isLoading }: Props) {
  return (
    <Transition
      as="div"
      appear
      show={isLoading}
      className="flex origin-center justify-center py-16"
      enter="transition ease-in-out duration-1000 delay-100"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-1"
      leave="transition ease-linear duration-50"
      leaveFrom="opacity-100 scale-1"
      leaveTo="opacity-0 scale-0"
    >
      <RiseLoader
        aria-label="Loading Spinner"
        color={SPINNER_COLOR_LIGHT}
        data-testid="loading spinner"
        loading
        className="opacity-75"
        margin={2}
        size={20}
        speedMultiplier={0.7}
      />
    </Transition>
  )
}
