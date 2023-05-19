import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import type { ScheduleType } from '&/modules/routine/types'
import { cl } from '&/common/utils'
import { PeriodItem } from './period-item'
import { WEEKLY } from '&/modules/routine/constants'
import { WeekRecurrence } from './week-recurrence'

interface Props {
  recurrence: number[]
  period: number
  handlePeriodChange: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
  handleRecurrenceChange: ({
    scheduleType,
    recurrenceNum,
  }: {
    scheduleType: ScheduleType
    recurrenceNum: number
  }) => void
  type: ScheduleType
}

export function Weekly({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === WEEKLY

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: WEEKLY, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2  p-8',
        isSelected ? 'border-transparent bg-sky-100' : 'border-sky-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-sky-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-sky-700 ">Weekly</h4>
        <div className="col-span-4 flex gap-2">
          <WeekRecurrence value={1} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(1)}>
            odd
          </WeekRecurrence>
          <WeekRecurrence value={0} handleChange={handleRecurrenceChange} isSelected={recurrence.includes(0)}>
            even
          </WeekRecurrence>
        </div>
      </div>
      <div className="z-10 mt-8 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="col-span-4">
          <PeriodItem handleChange={onPeriodChange} checked={isSelected && period === 1} value={1} id="week">
            during the week
          </PeriodItem>
          <PeriodItem handleChange={onPeriodChange} checked={isSelected && period === 2} value={2} id="weekend">
            in the weekend
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
