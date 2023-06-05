import { cl } from '&/common/utils'
import { NavLink } from 'react-router-dom'

interface Props {
  close: () => void
}

export function BoardNav({ close }: Props) {
  return (
    <nav className="gap-2 border-b py-4">
      <NavLink
        onClick={close}
        className={({ isActive }) =>
          cl(
            'flex h-10 w-full items-center justify-between rounded-lg px-4 text-sm transition-colors lg:text-base',
            isActive ? 'bg-indigo-100' : 'hover:bg-indigo-50'
          )
        }
        to="today"
      >
        {({ isActive }) => (
          <span className={cl('text-indigo-700', isActive ? 'font-bold' : 'font-semibold')}>Today</span>
        )}
      </NavLink>
      <NavLink
        onClick={close}
        className={({ isActive }) =>
          cl(
            'flex h-10 w-full items-center justify-between rounded-lg px-4 text-sm transition-colors lg:text-base',
            isActive ? 'bg-sky-100' : 'hover:bg-sky-50'
          )
        }
        to="week"
      >
        {({ isActive }) => (
          <span className={cl('text-sky-700', isActive ? 'font-bold' : 'font-semibold')}>This week</span>
        )}
      </NavLink>
      <NavLink
        onClick={close}
        className={({ isActive }) =>
          cl(
            'flex h-10 w-full items-center justify-between rounded-lg px-4 text-sm transition-colors lg:text-base',
            isActive ? 'bg-purple-100' : 'hover:bg-purple-50'
          )
        }
        to="month"
      >
        {({ isActive }) => (
          <span className={cl('text-purple-700', isActive ? 'font-bold' : 'font-semibold')}>This month</span>
        )}
      </NavLink>
      {/* <NavLink
        onClick={close}
        className={({ isActive }) =>
          cl(
            'flex h-10 w-full items-center justify-between rounded-lg px-4 text-sm transition-colors lg:text-base',
            isActive ? 'bg-indigo-100' : 'hover:bg-indigo-50'
          )
        }
        to="tomorrow"
      >
        {({ isActive }) => (
          <>
            <span className={cl('text-indigo-700', isActive ? 'font-bold' : 'font-semibold')}>Tomorrow</span>
            <span className={cl(isActive ? 'text-indigo-500' : 'text-indigo-400')}>3</span>
          </>
        )}
      </NavLink> */}
    </nav>
  )
}
