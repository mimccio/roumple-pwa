import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import error404Img from '@/assets/illustrations/error-404.png'
import { Link } from 'react-router-dom'

export function NotFoundScreen() {
  const { t } = useTranslation('error')

  return (
    <div className="flex h-full min-h-screen justify-center pt-[25vh]">
      <Transition
        appear
        show
        className="flex flex-col items-center gap-4 py-8"
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <img src={error404Img} className="mx-auto flex h-52 w-52 items-center justify-center opacity-75" />
        <p className="text-center text-sm font-semibold text-gray-500">{t('pageDoenstExists')}</p>
        <Link
          className="mt-4 rounded-lg bg-indigo-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-indigo-400"
          to="/"
        >
          {t('backHome')}
        </Link>
      </Transition>
    </div>
  )
}
