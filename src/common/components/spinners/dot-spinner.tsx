import { SPINNER_COLOR } from '@/common/constants'
import { Transition } from '@headlessui/react'
import { DotLoader } from 'react-spinners'

interface Props {
  show?: boolean
}

export function DotSpinner({ show = false }: Props) {
  return (
    <Transition
      appear
      show={show}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DotLoader loading color={SPINNER_COLOR} size={22} aria-label="Loading Spinner" data-testid="fetching loader" />
    </Transition>
  )
}
