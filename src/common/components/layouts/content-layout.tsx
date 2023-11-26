import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function ContentLayout({ children }: Props) {
  return <main className="no-scrollbar absolute bottom-0 top-14 flex w-full flex-col overflow-y-auto">{children}</main>
}
