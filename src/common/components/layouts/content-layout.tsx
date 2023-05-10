import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

// 56px => header (h-14)

export function ContentLayout({ children }: Props) {
  return <main className="no-scrollbar flex h-[calc(100vh-56px)] flex-col overflow-y-auto py-8">{children}</main>
}
