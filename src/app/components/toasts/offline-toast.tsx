import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { SignalSlashIcon } from '@heroicons/react/24/outline'

interface Props {
  toastId: string
}

export function OfflineToast({ toastId }: Props) {
  const { t } = useTranslation('message')

  return (
    <div className="flex  bg-yellow-50  text-gray-800 ">
      <div className="px-4 py-2">
        <div className="flex items-center gap-x-4">
          <SignalSlashIcon width={20} />
          <span>{t('Offline')}</span>
        </div>
        <p className="text-sm">{t('Data may not be up to date')}</p>
      </div>
      <button
        onClick={() => toast.dismiss(toastId)}
        className="rounded-r-lg bg-yellow-100 px-4 text-sm transition-colors hover:bg-yellow-200"
      >
        OK
      </button>
    </div>
  )
}
