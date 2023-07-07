import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function MainListLayout({ children }: Props) {
  return <div className="flex flex-col gap-y-4 px-4">{children}</div>
}
