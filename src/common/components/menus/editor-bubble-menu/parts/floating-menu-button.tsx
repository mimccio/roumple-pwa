import type { ReactNode } from 'react'
import { cl } from '&/common/utils'

interface Props {
  children: ReactNode
  handleClick: () => void
  isActive: boolean
}

export function FloatingMenuButton({ children, handleClick, isActive }: Props) {
  return (
    <button
      onClick={handleClick}
      className={cl(
        'flex items-center justify-center rounded-md p-1 transition-colors ',
        isActive ? 'bg-indigo-200' : 'bg-gray-50 hover:bg-gray-100 '
      )}
    >
      {children}
    </button>
  )
}
