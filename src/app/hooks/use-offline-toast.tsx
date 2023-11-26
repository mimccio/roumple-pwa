import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { SignalIcon } from '@heroicons/react/24/outline'
import { OfflineToast } from '../components/toasts'

export function useOfflineToast() {
  const { t } = useTranslation('message')
  const position = 'top-center'
  const onlineId = 'online-toast'
  const offlineId = 'offline-toast'

  const offlineToast = () =>
    toast(<OfflineToast toastId={offlineId} />, {
      id: offlineId,
      position,
      duration: Infinity,
      className: 'p-0 [&>div]:m-0 overflow-hidden',
    })

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!navigator.onLine) {
        offlineToast()
      }
    })
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    function onlineHandler() {
      toast.dismiss(offlineId)
      toast.success(t('Back online'), {
        position,
        icon: <SignalIcon className="w-5 text-green-400" />,
        id: onlineId,
      })
    }

    function offlineHandler() {
      toast.dismiss(onlineId)
      offlineToast()
    }

    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)

    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [t])
}
