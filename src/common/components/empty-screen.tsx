import { Transition } from '@headlessui/react'

interface Props {
  text: string
  image: string
}

export function EmptyScreen({ image, text }: Props) {
  return (
    <Transition
      appear
      show
      className="flex h-4/5 flex-col items-center justify-center gap-4"
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <img src={image} className="mx-auto flex h-52 w-52 items-center justify-center opacity-25" />
      <p className="text-center text-sm font-semibold text-gray-300">{text}</p>
    </Transition>
  )
}
