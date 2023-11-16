import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DetailsNavbar({ children }: Props) {
  return (
    <div>
      <nav className="-mb-1 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-2 lg:px-4">
        {children}
      </nav>
    </div>
  )
}
