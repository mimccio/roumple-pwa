import type { ReactNode, ComponentType } from 'react'
import { cl } from '&/common/utils'

interface Props {
  children?: ReactNode
  handleClick: () => void
  isActive: boolean
  Icon?: ComponentType<{ className?: string }>
}

export function FloatingMenuButton({ children, handleClick, isActive, Icon }: Props) {
  return (
    <button
      onClick={handleClick}
      className={cl(
        'flex items-center justify-center rounded-md p-1 transition-colors ',
        isActive ? 'bg-indigo-200' : 'bg-gray-50 hover:bg-gray-100 '
      )}
    >
      {Icon ? <Icon className="h-4 w-4 fill-blue-600" /> : children}
    </button>
  )
}
