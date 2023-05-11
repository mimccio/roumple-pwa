import { Transition } from '@headlessui/react'
import signInImg from '&/assets/illustrations/sign-in.png'

export function Login() {
  const websiteUrl = import.meta.env.VITE_SITE_URL

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

      <Transition
        as="form"
        appear
        show
        className=" text-center text-gray-500 "
        enter="transition ease-in-out duration-700 transform"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
      >
        <h2 className="text-xl font-semibold">Sign in with magic link</h2>
        <p className="mb-4 mt-2 text-base">by entering your email below</p>
        <input
          placeholder="michelangelo@mail.com"
          type="text"
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
    </main>
  )
}
