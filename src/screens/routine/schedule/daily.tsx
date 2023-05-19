import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { ScheduleType } from '&/modules/routine/types'
import { DAILY } from '&/modules/routine/constants'
import { DayCircle } from './day-circle'
import { PeriodItem } from './period-item'

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

export function Daily({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === DAILY

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: DAILY, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-6 transition-colors',
        isSelected ? 'border-transparent bg-indigo-100' : 'border-indigo-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-indigo-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-indigo-700">Daily</h4>
        <div className="col-span-4 flex gap-2">
          <DayCircle
            disabled={!isSelected}
            value={1}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(1)}
            day="m"
          />
          <DayCircle
            disabled={!isSelected}
            value={2}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(2)}
            day="t"
          />
          <DayCircle
            disabled={!isSelected}
            value={3}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(3)}
            day="w"
          />
          <DayCircle
            disabled={!isSelected}
            value={4}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(4)}
            day="t"
          />
          <DayCircle
            disabled={!isSelected}
            value={5}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(5)}
            day="f"
          />
          <DayCircle
            disabled={!isSelected}
            value={6}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(6)}
            day="s"
          />
          <DayCircle
            disabled={!isSelected}
            value={0}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(0)}
            day="s"
          />
        </div>
      </div>
      <div className="z-10 mt-8 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="morning"
            type={DAILY}
            value={1}
          >
            in the morning
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={onPeriodChange}
            id="lunch"
            type={DAILY}
            value={2}
          >
            during lunch time
          </PeriodItem>
          <PeriodItem
            checked={isSelected && (period === 3 || period === 0)}
            handleChange={onPeriodChange}
            id="day"
            type={DAILY}
            value={3}
          >
            during the day
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 4}
            handleChange={onPeriodChange}
            id="evening"
            type={DAILY}
            value={4}
          >
            in the evening
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
