import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DetailsNavbar({ children }: Props) {
  return (
    <nav className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm lg:px-4">
      {children}
    </nav>
  )
}
