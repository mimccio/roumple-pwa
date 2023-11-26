import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { SignalSlashIcon } from '@heroicons/react/24/outline'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true)
    }

    function offlineHandler() {
      setIsOnline(false)
    }

    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)

    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [])
  return (
    <Transition
      aria-hidden
      appear
      show={!isOnline}
      className="fixed bottom-4 right-3 z-30 md:bottom-3"
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <SignalSlashIcon width={20} className="w-5 text-gray-300" />
    </Transition>
  )
}
