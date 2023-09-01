import { Transition } from '@headlessui/react'
import { ReactNode } from 'react'
import { SimpleContent } from './parts/simple-content'
import { ClickableContent } from './parts/clickable-content'

interface Props {
  text: string | ReactNode
  image: string
  onClick?: () => void
}

export function EmptyMainContent({ image, text, onClick }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Transition
        appear
        show
        className="w-full px-4"
        enter=" transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        {onClick ? (
          <ClickableContent image={image} text={text} onClick={onClick} />
        ) : (
          <SimpleContent image={image} text={text} />
        )}
      </Transition>
    </div>
  )
}
