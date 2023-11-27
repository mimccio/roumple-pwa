import type { FormEvent } from 'react'

import { SCHEDULE_TYPES } from '@/common/constants'
import { cl } from '@/common/utils'
import type { ScheduleType } from '@/common/types'

interface Props {
  disabled: boolean
  handleChange: ({ scheduleType, recurrenceNum }: { scheduleType: ScheduleType; recurrenceNum: number }) => void
  isSelected: boolean
  month: string
  value: number
}

export function MonthCircle({ month, isSelected, handleChange, value, disabled }: Props) {
  const onChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault()
    handleChange({ scheduleType: SCHEDULE_TYPES.monthly, recurrenceNum: value })
  }

  return (
    <label
      className={cl(
        'flex h-4 w-4 items-center justify-center rounded-full text-2xs font-semibold capitalize transition-colors enabled:cursor-pointer',
        isSelected
          ? 'bg-purple-500 text-white hover:bg-purple-400'
          : 'border-2 border-gray-400 text-gray-400 enabled:hover:border-purple-400 enabled:hover:text-purple-400',
        disabled ? 'cursor-default' : 'cursor-pointer '
      )}
    >
      <input className="hidden" type="checkbox" checked={isSelected} onChange={onChange} disabled={disabled} />
      {month}
    </label>
  )
}
