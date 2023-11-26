import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function MainListLayout({ children }: Props) {
  return <div className="mb-12 mt-4 flex flex-col gap-y-4 px-2 xl:px-4">{children}</div>
}
