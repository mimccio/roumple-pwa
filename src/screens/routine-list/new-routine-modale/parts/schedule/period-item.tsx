import type { FormEvent } from 'react'
import type { ScheduleType } from '&/modules/routine/types'
import { MONTHLY, WEEKLY } from '&/modules/routine/constants'
import { cl } from '&/common/utils'

interface Props {
  checked: boolean
  children: string
  handleChange: (evt: FormEvent<HTMLInputElement>) => void
  id: string
  type: ScheduleType
  value: number
}

export function PeriodItem({ children, value, id, checked, handleChange, type }: Props) {
  const getAccentColor = () => {
    if (type === WEEKLY) return 'accent-sky-600'
    if (type === MONTHLY) return 'accent-purple-500'
    return 'accent-indigo-500'
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
      <label className="cursor-pointer pl-4 text-gray-700 transition-colors hover:text-gray-800" htmlFor={id}>
        {children}
      </label>
    </li>
  )
}
