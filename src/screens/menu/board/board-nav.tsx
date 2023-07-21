import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { cl } from '&/common/utils'
import { useBoardCount } from '&/modules/board/hooks'

interface Props {
  close: () => void
}

export function BoardNav({ close }: Props) {
  const { t } = useTranslation('schedule')
  const { todayNum, weekNum, monthNum } = useBoardCount()

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
          <>
            <span className={cl('text-indigo-700', isActive ? 'font-bold' : 'font-semibold')}>{t('today')}</span>
            <span className={cl('text-sm', isActive ? 'text-indigo-500' : 'text-indigo-400')}>{todayNum}</span>
          </>
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
          <>
            <span className={cl('text-sky-700', isActive ? 'font-bold' : 'font-semibold')}>{t('thisWeek')}</span>
            <span className={cl('text-sm', isActive ? 'text-sky-500' : 'text-sky-400')}>{weekNum}</span>
          </>
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
          <>
            <span className={cl('text-purple-700', isActive ? 'font-bold' : 'font-semibold')}>{t('thisMonth')}</span>
            <span className={cl('text-sm', isActive ? 'text-purple-500' : 'text-purple-400')}>{monthNum}</span>
          </>
        )}
      </NavLink>
    </nav>
  )
}
