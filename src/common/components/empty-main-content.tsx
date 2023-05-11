import { Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'

interface Props {
  text: string
  image: string
  header?: boolean
  to: string
}

export function EmptyMainContent({ image, text, to }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Transition
        appear
        show
        className="w-full px-4"
        enter=" transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <NavLink to={to} className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
          <img
            src={image}
            className="mx-auto flex h-52 w-52 items-center justify-center opacity-25 transition-opacity duration-500 group-hover:opacity-50"
          />
          <p className="text-center text-sm font-semibold text-gray-300 transition-colors duration-500 group-hover:text-gray-400">
            {text}
          </p>
        </NavLink>
      </Transition>
    </div>
  )
}
