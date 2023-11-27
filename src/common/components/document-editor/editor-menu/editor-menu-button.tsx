import type { ReactNode, ComponentType, MouseEvent, RefObject } from 'react'
import { cl } from '@/common/utils'

interface Props {
  children?: ReactNode
  handleClick: () => void
  isActive: boolean
  Icon?: ComponentType<{ className?: string }>
  buttonRef?: RefObject<HTMLButtonElement>
}

export function EditorMenuButton({ children, handleClick, isActive, Icon, buttonRef }: Props) {
  const onClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    document.getElementById('focusdummy')?.focus() // prevent chrome keyboard from jumping around
    handleClick()
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cl(
        'flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-gray-200',
        isActive ? 'bg-gray-100 fill-gray-500 text-gray-500' : 'fill-gray-400 text-gray-400'
      )}
    >
      {Icon ? <Icon className="h-4 w-4 " /> : children}
    </button>
  )
}
