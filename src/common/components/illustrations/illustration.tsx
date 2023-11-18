import { cl } from '&/common/utils'
import { Transition } from '@headlessui/react'
import { ReactNode } from 'react'

interface Props {
  text: ReactNode
  image: string
  onClick?: () => void
}

export function Illustration({ image, text, onClick }: Props) {
  return (
    <Transition
      appear
      show
      as={onClick ? 'button' : 'div'}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className={cl('transition-all', onClick ? 'hover:opacity-75' : '')}
      onClick={onClick}
    >
      <img src={image} className="mx-auto flex h-52 w-52 items-center justify-center opacity-50" />
      <p className="text-center text-sm font-semibold text-gray-300">{text}</p>
    </Transition>
  )
}
