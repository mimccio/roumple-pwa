import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DetailInfoSection({ children }: Props) {
  return <section className="flex flex-col border-b bg-gray-100 p-4">{children}</section>
}