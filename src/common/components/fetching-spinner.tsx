import { useIsFetching, useIsMutating, onlineManager } from '@tanstack/react-query'
import { Transition } from '@headlessui/react'
import { DotLoader } from 'react-spinners'
import { SPINNER_COLOR } from '../constants'

export function FetchingSpinner() {
  const fetchingNum = useIsFetching()
  const mutatingNum = useIsMutating()
  const isOnline = onlineManager.isOnline()
  const isMutating = isOnline && mutatingNum >= 1

  return (
    <Transition
      appear
      show={fetchingNum >= 1 || isMutating}
      className="fixed bottom-4 right-4 z-30 md:bottom-6 md:right-6"
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DotLoader loading color={SPINNER_COLOR} size={22} aria-label="Loading Spinner" data-testid="fetching loader" />
    </Transition>
  )
}
