import type { ReactNode } from 'react'

interface Props {
  message: string
  children: ReactNode
  position?: 'start' | 'center' | 'end'
  disabled?: boolean
}

export function Tooltip({ message, children, position = 'center', disabled }: Props) {
  return (
    <div className={`group relative flex justify-${position}`}>
      {children}
      {!disabled && (
        <span className="w-content absolute top-12 z-40 flex scale-0 justify-center whitespace-nowrap rounded bg-gray-600 p-2 text-xs lowercase text-white transition-all group-hover:scale-100">
          {message}
        </span>
      )}
    </div>
  )
}
