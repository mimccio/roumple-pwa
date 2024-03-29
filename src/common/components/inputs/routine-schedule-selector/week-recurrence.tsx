import type { FormEvent } from 'react'

import { SCHEDULE_TYPES } from '&/common/constants'
import type { ScheduleType } from '&/common/types'
import { cl } from '&/common/utils'

interface Props {
  children: string
  disabled: boolean
  handleChange: ({ scheduleType, recurrenceNum }: { scheduleType: ScheduleType; recurrenceNum: number }) => void
  isSelected: boolean
  value: number
}

export function WeekRecurrence({ children, isSelected, handleChange, value, disabled }: Props) {
  const onChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault()
    handleChange({ scheduleType: SCHEDULE_TYPES.weekly, recurrenceNum: value })
  }

  return (
    <label
      className={cl(
        'flex h-5 w-12 items-center justify-center rounded-md text-xs font-semibold transition-colors enabled:cursor-pointer',
        isSelected
          ? 'bg-sky-500 text-white hover:bg-sky-400'
          : 'border-2 border-gray-400 text-gray-400 enabled:hover:border-sky-400 enabled:hover:text-sky-400',
        disabled ? 'cursor-default' : 'cursor-pointer '
      )}
    >
      <input className="hidden" type="checkbox" checked={isSelected} onChange={onChange} disabled={disabled} />

      {children}
    </label>
  )
}
