import type { ReactNode } from 'react'

interface Props {
  text: string | ReactNode
  image: string
  onClick: () => void
}

export function ClickableContent({ image, text, onClick }: Props) {
  return (
    <button onClick={onClick} className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
      <img
        src={image}
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-25 transition-opacity duration-500 group-hover:opacity-50"
        aria-hidden="true"
      />
      <p className="text-center text-sm font-semibold text-gray-300 transition-colors duration-500 group-hover:text-gray-400">
        {text}
      </p>
    </button>
  )
}
