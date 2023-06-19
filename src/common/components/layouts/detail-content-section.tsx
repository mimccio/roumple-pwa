import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DetailContentSection({ children }: Props) {
  return <section className="mb-14 flex flex-1 flex-col gap-2">{children}</section>
}
