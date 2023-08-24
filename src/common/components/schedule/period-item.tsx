import type { FormEvent } from 'react'
import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'

interface Props {
  checked: boolean
  children: string
  handleChange: (evt: FormEvent<HTMLInputElement>) => void
  id: string
  scheduleType?: ScheduleType
  value: number
}

export function PeriodItem({ children, value, id, checked, handleChange, scheduleType }: Props) {
  const getAccentColor = () => {
    if (scheduleType === SCHEDULE_TYPES.daily) return 'accent-indigo-500'
    if (scheduleType === SCHEDULE_TYPES.weekly) return 'accent-sky-600'
    if (scheduleType === SCHEDULE_TYPES.monthly) return 'accent-purple-500'
    return 'accent-gray-500'
  }

  const accentColor = getAccentColor()

  return (
    <li className="list-none">
      <input
        className={cl('cursor-pointer', accentColor)}
        onChange={handleChange}
        checked={checked}
        value={value}
        id={id}
        type="radio"
      />
      <label className="cursor-pointer pl-4 lowercase text-gray-700 transition-colors hover:text-gray-800" htmlFor={id}>
        {children}
      </label>
    </li>
  )
}
