import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'

interface Props {
  email: string
  handleEmailChange: (evt: FormEvent<HTMLInputElement>) => void
  handleLogin: (e: FormEvent) => Promise<void>
  isLoading: boolean
}

export function SignIn({ isLoading, handleLogin, email, handleEmailChange }: Props) {
  const { t } = useTranslation(['action', 'login'])
  const websiteUrl = import.meta.env.VITE_SITE_URL

  return (
    <>
      <Transition
        as="p"
        appear
        show={isLoading}
        className="text-center text-lg font-semibold text-gray-500"
        enter="transition ease-in-out duration-500 transform delay-300"
        enterFrom="opacity-0 -translate-y-full"
        enterTo="opacity-100 translate-y-0"
      >
        {t('sendingMagicLink', { ns: 'login' })}
      </Transition>
      <Transition
        as="form"
        appear
        show={!isLoading}
        className=" text-center text-gray-500 "
        enter="transition ease-in-out duration-700 transform"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-28"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl font-semibold">{t('signInWithMagicLink', { ns: 'login' })}</h2>
        <p className="mb-4 mt-2 text-base">{t('byEnteringEmailBelow', { ns: 'login' })}</p>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={handleEmailChange}
          className="my-8 h-10 w-full max-w-md rounded-lg border border-indigo-100 bg-indigo-50 px-2 text-base font-normal text-gray-800 transition-colors duration-300 placeholder:text-sm placeholder:text-gray-300 focus-visible:border-indigo-300 focus-visible:outline-none"
        />
        <div className="mx-auto mt-4 flex  w-full max-w-md justify-between text-base font-normal">
          <a
            className="flex h-8 items-center rounded-lg px-4 text-gray-400 transition-colors duration-300 hover:text-gray-500"
            href={websiteUrl}
          >
            {t('cancel', { ns: 'action' })}
          </a>
          <button className="ml-8 h-8 rounded-lg bg-indigo-400 px-4 font-semibold text-white transition-colors duration-300 hover:bg-indigo-500">
            {t('submit', { ns: 'action' })}
          </button>
        </div>
      </Transition>
    </>
  )
}
