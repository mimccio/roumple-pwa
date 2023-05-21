import type { ReactNode } from 'react'

interface Props {
  message: string
  children: ReactNode
  position?: 'start' | 'center' | 'end'
}

export function Tooltip({ message, children, position = 'center' }: Props) {
  return (
    <div className={`group relative flex justify-${position}`}>
      {children}
      <span className="w-content absolute top-10 flex scale-0 justify-center whitespace-nowrap rounded bg-gray-600 p-2 text-xs text-white transition-all group-hover:scale-100">
        {message}
      </span>
    </div>
  )
}
