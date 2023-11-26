import type { ComponentType } from 'react'

interface Props {
  title: string
  Icon?: ComponentType<{ className?: string }>
}

export function SectionTitle({ title, Icon }: Props) {
  return (
    <h2 className="flex font-bold leading-10 text-gray-500">
      {Icon && <Icon className="mr-2 w-5 text-gray-400" />}
      <span>{title}</span>
    </h2>
  )
}
