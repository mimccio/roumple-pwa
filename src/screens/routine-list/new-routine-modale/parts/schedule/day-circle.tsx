import type { FormEvent } from 'react'

import { cl } from '&/common/utils'
import type { ScheduleType } from '&/modules/routine/types'
import { SCHEDULE_TYPES } from '&/common/constants'

interface Props {
  day: string
  disabled: boolean
  handleChange: ({ scheduleType, recurrenceNum }: { scheduleType: ScheduleType; recurrenceNum: number }) => void
  isSelected: boolean
  value: number
}

export function DayCircle({ day, isSelected, handleChange, value, disabled }: Props) {
  const onChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault()
    handleChange({ scheduleType: SCHEDULE_TYPES.daily, recurrenceNum: value })
  }

  return (
    <label
      className={cl(
        'flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold transition-colors',
        isSelected
          ? 'bg-indigo-500 text-white hover:bg-indigo-400'
          : 'border-2 border-gray-400 text-gray-400 enabled:hover:border-indigo-400 enabled:hover:text-indigo-400',
        disabled ? 'cursor-default' : 'cursor-pointer '
      )}
    >
      <input className="hidden" type="checkbox" checked={isSelected} onChange={onChange} disabled={disabled} />
      {day}
    </label>
  )
}
