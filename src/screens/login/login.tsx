import { Transition } from '@headlessui/react'
import OtpInput from 'react-otp-input'

import signInImg from '&/assets/illustrations/sign-in.png'
import { useLogin } from '&/modules/auth/hooks'

export function Login() {
  const { handleLogin, isLoading, setEmail, email, isDone, handleChange, code, handleVerify, reset, verifyIsLoading } =
    useLogin()
  const websiteUrl = import.meta.env.VITE_SITE_URL

  console.log('verifyIsLoading :', verifyIsLoading)

  return (
    <main className="flex h-screen flex-col p-8">
      <Transition
        as="h1"
        appear
        show
        className="text-3xl font-bold text-indigo-400"
        enter="transition ease-in-out duration-700 transform"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
      >
        Roumple
      </Transition>

      <Transition
        as="section"
        appear
        show
        className="flex h-2/5 flex-col items-center justify-center gap-4"
        enter="transition ease-in-out duration-1000 transform"
        enterFrom="opacity-0 -translate-y-full"
        enterTo="opacity-100 translate-y-0"
      >
        <img src={signInImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-40" />
      </Transition>

      {isLoading && (
        <Transition
          as="p"
          appear
          show
          className="text-center text-lg font-semibold text-gray-500"
          enter="transition ease-in-out duration-1000 transform"
          enterFrom="opacity-0 -translate-y-full"
          enterTo="opacity-100 translate-y-0"
        >
          Sending magic link...
        </Transition>
      )}

      {!isLoading && !isDone && (
        <Transition
          as="form"
          appear
          show
          className=" text-center text-gray-500 "
          enter="transition ease-in-out duration-700 transform"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-full"
          onSubmit={handleLogin}
        >
          <h2 className="text-xl font-semibold">Sign in with magic link</h2>
          <p className="mb-4 mt-2 text-base">by entering your email below</p>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="my-8 h-10 w-full max-w-md rounded-lg border border-indigo-100 bg-indigo-50 px-2 text-base font-normal text-gray-800 transition-colors duration-300 placeholder:text-sm placeholder:text-gray-300 focus-visible:border-indigo-300 focus-visible:outline-none"
          />
          <div className="mx-auto mt-4 flex  w-full max-w-md justify-between text-base font-normal">
            <a
              className="flex h-8 items-center rounded-lg px-4 text-gray-400 transition-colors duration-300 hover:text-gray-500"
              href={websiteUrl}
            >
              Cancel
            </a>
            <button className="ml-8 h-8 rounded-lg bg-indigo-400 px-4 font-semibold text-white transition-colors duration-300 hover:bg-indigo-500">
              Submit
            </button>
          </div>
        </Transition>
      )}

      {!isLoading && isDone && (
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
          <p className="mt-2 text-base">Click the link in the email or enter the code below</p>

          <div className="my-12 flex justify-center">
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={6}
              renderInput={(props) => (
                <input {...props} style={{ width: '32px' }} className="mx-2 h-8 rounded-md border text-center" />
              )}
            />
          </div>

          <div className="mx-auto mt-8 flex  w-full max-w-md justify-between text-base font-normal">
            <button
              disabled={verifyIsLoading}
              onClick={reset}
              className="flex h-8 items-center rounded-lg px-4 text-gray-400 transition-colors duration-300 enabled:hover:text-gray-500 disabled:text-gray-300"
            >
              Cancel
            </button>
            <button
              disabled={verifyIsLoading}
              className="ml-8 h-8 rounded-lg bg-indigo-400 px-4 font-semibold text-white transition-colors duration-300 enabled:hover:bg-indigo-500 disabled:bg-gray-300"
            >
              Submit
            </button>
          </div>
        </Transition>
      )}
    </main>
  )
}
