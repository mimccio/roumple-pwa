import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DetailsNavbar({ children }: Props) {
  return (
    <div className="h-[52px] min-h-[52px] bg-gray-50">
      <nav className="flex h-full items-center justify-between  px-4">{children}</nav>
    </div>
  )
}
