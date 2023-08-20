import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import OTPInput from 'react-otp-input'
import { Link } from 'react-router-dom'
import { cl } from '&/common/utils'

interface Props {
  code: string
  handleOptChange: (value: string) => Promise<void>
  handleVerify: (event: FormEvent) => Promise<void>
  verifyIsLoading: boolean
}

export function Verify({ handleVerify, code, handleOptChange, verifyIsLoading }: Props) {
  const { t } = useTranslation(['action', 'login'])

  return (
    <Transition
      as="form"
      appear
      show
      className="text-center text-gray-500 "
      enter="transition ease-in-out duration-700 transform"
      enterFrom="opacity-0 translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-full"
      onSubmit={handleVerify}
    >
      <p className="mt-2 text-base">{t('verifyEmail', { ns: 'login' })}</p>

      <div className="my-12 flex justify-center">
        <OTPInput
          value={code}
          onChange={handleOptChange}
          numInputs={6}
          inputType="number"
          renderInput={(props) => (
            <input
              {...props}
              style={{ width: '32px' }}
              type="number"
              className="mx-2 h-8 rounded-md border text-center"
            />
          )}
        />
      </div>

      <div className="mx-auto mt-8 flex  w-full max-w-md justify-between text-base font-normal">
        <Link
          to="/login"
          className={cl(
            'flex h-8 items-center rounded-lg px-4 transition-colors duration-300 enabled:hover:text-gray-500 disabled:text-gray-300',
            verifyIsLoading ? 'pointer-events-none text-gray-300' : ':hover:text-gray-500 text-gray-400'
          )}
        >
          {t('cancel', { ns: 'action' })}
        </Link>
        <button
          disabled={verifyIsLoading}
          className="ml-8 h-8 rounded-lg bg-indigo-400 px-4 font-semibold text-white transition-colors duration-300 enabled:hover:bg-indigo-500 disabled:animate-pulse disabled:bg-gray-300"
        >
          {t('submit', { ns: 'action' })}
        </button>
      </div>
    </Transition>
  )
}
