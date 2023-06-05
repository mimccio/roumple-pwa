import { cl } from '&/common/utils'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'
import { useBoardRoutineCount } from '&/modules/routine/hooks/use-board-routine-count'
import { NavLink } from 'react-router-dom'

interface Props {
  close: () => void
}

export function BoardNav({ close }: Props) {
  const dailyQuery = useBoardRoutineCount({ type: SCHEDULE_TYPES.daily })
  const weeklyQuery = useBoardRoutineCount({ type: SCHEDULE_TYPES.weekly })
  const monthlyQuery = useBoardRoutineCount({ type: SCHEDULE_TYPES.monthly })

  const todayNum = dailyQuery.count && dailyQuery.count > 0 ? dailyQuery.count : null
  const weekNum = weeklyQuery.count && weeklyQuery.count > 0 ? weeklyQuery.count : null
  const monthNum = monthlyQuery.count && monthlyQuery.count > 0 ? monthlyQuery.count : null

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
            <span className={cl('text-indigo-700', isActive ? 'font-bold' : 'font-semibold')}>Today</span>
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
            <span className={cl('text-sky-700', isActive ? 'font-bold' : 'font-semibold')}>This week</span>
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
            <span className={cl('text-purple-700', isActive ? 'font-bold' : 'font-semibold')}>This month</span>
            <span className={cl('text-sm', isActive ? 'text-purple-500' : 'text-purple-400')}>{monthNum}</span>
          </>
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
