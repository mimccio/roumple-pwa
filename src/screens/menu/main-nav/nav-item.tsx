import { cl } from '&/common/utils'
import type { ElementType } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  to: string
  name: string
  Icon: ElementType
  close: () => void
}

export function NavItem({ to, name, Icon, close }: Props) {
  return (
    <NavLink
      onClick={close}
      to={to}
      className={({ isActive }) =>
        cl(
          'flex h-9 items-center gap-4 rounded-lg px-4 text-sm transition-colors',
          isActive ? 'bg-gray-200' : 'hover:bg-gray-200'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon width={20} className={cl(isActive ? 'text-gray-500' : 'text-gray-400')} />
          <span className={cl(isActive ? 'font-bold text-gray-700' : 'font-semibold text-gray-600')}>{name}</span>
        </>
      )}
    </NavLink>
  )
}
