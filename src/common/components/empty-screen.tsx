import { Fragment } from 'react'

import { Transition } from '@headlessui/react'
import { cl } from '../utils'

interface Props {
  text: string
  image: string
  opacity?: boolean
  headerMargin?: boolean
}

export function EmptyScreen({ image, text, opacity, headerMargin }: Props) {
  return (
    <Transition
      appear
      show
      as={Fragment}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div
        className={cl('mb-20 flex grow flex-col items-center justify-center gap-4', headerMargin ? 'mt-14' : 'mt-0')}
      >
        <img
          src={image}
          className={cl('mx-auto flex h-52 w-52 items-center justify-center', opacity ? ' opacity-25' : 'opacity-75')}
        />
        <p className={cl('text-center text-sm font-semibold', cl(opacity ? 'text-gray-200' : 'text-gray-400'))}>
          {text}
        </p>
      </div>
    </Transition>
  )
}
