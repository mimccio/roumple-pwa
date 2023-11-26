import { useIsFetching, useIsMutating, onlineManager } from '@tanstack/react-query'
import { Transition } from '@headlessui/react'
import { DotLoader } from 'react-spinners'
import { SPINNER_COLOR } from '&/common/constants'

export function FetchingSpinner() {
  const fetchingNum = useIsFetching()
  const mutatingNum = useIsMutating()
  const isOnline = onlineManager.isOnline()
  const isMutating = isOnline && mutatingNum >= 1

  return (
    <Transition
      appear
      show={fetchingNum >= 1 || isMutating}
      className="fixed bottom-3 right-3 z-30"
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
