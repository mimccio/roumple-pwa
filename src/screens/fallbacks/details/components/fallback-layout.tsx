import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function FallbackLayout({ children }: Props) {
  return <div className="flex grow items-center justify-center bg-gray-50 pb-20 pt-14">{children}</div>
}
