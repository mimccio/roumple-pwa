import type { ComponentType, ReactNode } from 'react'
import { SectionTitle } from './section-title'

interface Props {
  title: string
  Icon?: ComponentType<{ className?: string }>
  children: ReactNode
}

export function Section({ title, Icon, children }: Props) {
  return (
    <section>
      <SectionTitle title={title} Icon={Icon} />
      <div className="ml-8 mt-2">{children}</div>
    </section>
  )
}
