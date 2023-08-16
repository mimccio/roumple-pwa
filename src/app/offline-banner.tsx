import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { WifiIcon, XMarkIcon } from '@heroicons/react/24/solid'

export function OfflineBanner() {
  const { t } = useTranslation('message')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineBanner, setShowOfflineBanner] = useState(true)

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

  if (!isOnline && showOfflineBanner) {
    return (
      <div className="relative flex w-full flex-1 items-center justify-between gap-x-2 bg-yellow-300 px-2 font-semibold text-gray-600 sm:px-3">
        <span className="p-2">
          <WifiIcon width={20} />
        </span>
        <span className="py-1">{t('offlineBanner')}</span>
        <button className="p-2 transition-colors hover:text-gray-500" onClick={() => setShowOfflineBanner(false)}>
          <XMarkIcon width={20} />
        </button>
      </div>
    )
  }

  return null
}
