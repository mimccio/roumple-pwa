import { Transition } from '@headlessui/react'

interface Props {
  text: string
  image: string
  opacity?: boolean
}

export function Illustration({ image, text }: Props) {
  return (
    <Transition
      appear
      show
      as="div"
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <img src={image} className="mx-auto flex h-52 w-52 items-center justify-center opacity-50" />
      <p className="text-center text-sm font-semibold text-gray-300">{text}</p>
    </Transition>
  )
}
