import type { FormEvent } from 'react'
import type { ScheduleType } from '&/modules/routine/types'
import { cl } from '&/common/utils'
import { WEEKLY } from '&/modules/routine/constants'

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
    handleChange({ scheduleType: WEEKLY, recurrenceNum: value })
  }

  return (
    <label
      className={cl(
        'flex h-5 w-11 items-center justify-center rounded-md text-xs font-semibold transition-colors enabled:cursor-pointer',
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
