import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function MainListFallbackLayout({ children }: Props) {
  return <div className="flex grow items-center justify-center pb-20 pt-8 ">{children}</div>
}
