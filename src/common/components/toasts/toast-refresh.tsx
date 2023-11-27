import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import { Toast, toast as reactHotToast } from 'react-hot-toast'
import constructionImg from '@/assets/illustrations/construction.png'

interface Props {
  toast: Toast
  onUpdate: () => void
}

export function ToastRefresh({ toast, onUpdate }: Props) {
  const { t } = useTranslation('message')

  const onRefresh = () => {
    onUpdate()
    reactHotToast.dismiss(toast.id)
  }

  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      <Transition
        show={toast.visible}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pointer-events-auto flex w-full max-w-md  rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <img src={constructionImg} className="mx-auto flex h-24 w-24 items-center justify-center opacity-50" />
          <div className="flex w-0 flex-1 items-center p-4">
            <div className="w-full">
              <p className="text-sm font-semibold text-gray-600">{t('Please refresh')}</p>
              <p className="mt-1 text-sm text-gray-500">{t('newVersionAvailable')}</p>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <div className="flex flex-col divide-y divide-gray-200">
              <div className="flex h-0 flex-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent px-4 py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={onRefresh}
                >
                  {t('Refresh')}
                </button>
              </div>
              <div className="flex h-0 flex-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => reactHotToast.dismiss(toast.id)}
                >
                  {t('Dismiss')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
