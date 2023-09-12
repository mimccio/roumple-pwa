import type { ReactNode } from 'react'

interface Props {
  text: string | ReactNode
  image: string
}

export function SimpleContent({ image, text }: Props) {
  return (
    <div className="mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
      <img
        src={image}
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-25"
        aria-hidden="true"
        alt=""
      />
      <p className="text-center text-sm font-semibold text-gray-300">{text}</p>
    </div>
  )
}
