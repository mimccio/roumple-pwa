import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import type { ScheduleType } from '&/modules/routine/types'
import { cl } from '&/common/utils'
import { PeriodItem } from './period-item'
import { WEEKLY } from '&/modules/routine/constants'
import { WeekRecurrence } from './week-recurrence'

interface Props {
  type: ScheduleType
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
}

export function Weekly({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === WEEKLY

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: WEEKLY, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-4 transition-colors',
        isSelected ? 'border-transparent bg-sky-100  shadow-md shadow-sky-200' : 'border-sky-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-sky-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-sky-700 ">Weekly</h4>
        <div className="col-span-4 flex gap-2">
          <WeekRecurrence
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(1)}
            value={1}
            disabled={!isSelected}
          >
            odd
          </WeekRecurrence>
          <WeekRecurrence
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(0)}
            value={0}
            disabled={!isSelected}
          >
            even
          </WeekRecurrence>
        </div>
      </div>
      <div className="z-10 mt-4 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="week"
            type={WEEKLY}
            value={1}
          >
            during the week
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={onPeriodChange}
            id="weekend"
            type={WEEKLY}
            value={2}
          >
            in the weekend
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
