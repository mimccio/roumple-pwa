import { Navigate, Route, Routes } from 'react-router-dom'
import { Transition } from '@headlessui/react'

import signInImg from '&/assets/illustrations/sign-in.png'
import { useLogin } from '&/modules/auth/hooks'
import { SignIn } from './sign-in'
import { Verify } from './verify'

export function Login() {
  const { handleLogin, isLoading, handleEmailChange, email, handleOptChange, code, handleVerify, verifyIsLoading } =
    useLogin()

  return (
    <main className="flex min-h-screen flex-col gap-4 p-8 pb-12">
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
        className="flex h-2/5 min-h-[320px] flex-col items-center justify-center gap-4"
        enter="transition ease-in-out duration-1000 transform"
        enterFrom="opacity-0 -translate-y-full"
        enterTo="opacity-100 translate-y-0"
      >
        <img src={signInImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-40" />
      </Transition>

      <Routes>
        <Route
          index
          element={
            <SignIn
              email={email}
              handleEmailChange={handleEmailChange}
              handleLogin={handleLogin}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="email-sent"
          element={
            <Verify
              code={code}
              handleOptChange={handleOptChange}
              handleVerify={handleVerify}
              verifyIsLoading={verifyIsLoading}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </main>
  )
}
