import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function DetailsFallbackLayout({ children }: Props) {
  return <div className="flex grow items-center justify-center border-t border-gray-200 pb-20 pt-1">{children}</div>
}
