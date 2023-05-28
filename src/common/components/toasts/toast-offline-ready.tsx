import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { Toast, toast } from 'react-hot-toast'
import sportImg from '&/assets/illustrations/sport.png'

interface Props {
  t: Toast
}

export function ToastOfflineReady({ t }: Props) {
  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition
        show={t.visible}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pointer-events-auto flex w-full max-w-md  rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <img src={sportImg} className="mx-auto flex h-24 w-24 items-center justify-center opacity-50" />
          <div className="flex w-0 flex-1 items-center p-4">
            <div className="w-full">
              <p className="text-sm font-semibold text-gray-600">Offline ready</p>
              <p className="mt-1 text-sm text-gray-500">The app is ready to work offline.</p>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <div className="flex flex-col divide-y divide-gray-200">
              <div className="flex h-0 flex-1">
                <button
                  type="button"
                  className="flex w-full min-w-[80px] items-center justify-center rounded-none rounded-tr-lg border border-transparent px-4 py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
