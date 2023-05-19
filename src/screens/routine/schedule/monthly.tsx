import type { FormEvent } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { ScheduleType } from '&/modules/routine/types'
import { MONTHLY } from '&/modules/routine/constants'
import { PeriodItem } from './period-item'
import { MonthCircle } from './month-circle'

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

export function Monthly({ recurrence, period, handlePeriodChange, type, handleRecurrenceChange }: Props) {
  const isSelected = type === MONTHLY

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: MONTHLY, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-6 transition-colors',
        isSelected ? 'border-transparent bg-purple-100' : 'border-purple-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 z-0 text-purple-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-purple-700 ">Monthly</h4>
        <div className="col-span-4 flex flex-wrap gap-1">
          <MonthCircle
            disabled={!isSelected}
            value={1}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(1)}
            month="j"
          />
          <MonthCircle
            disabled={!isSelected}
            value={2}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(2)}
            month="f"
          />
          <MonthCircle
            disabled={!isSelected}
            value={3}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(3)}
            month="m"
          />
          <MonthCircle
            disabled={!isSelected}
            value={4}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(4)}
            month="a"
          />
          <MonthCircle
            disabled={!isSelected}
            value={5}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(5)}
            month="m"
          />
          <MonthCircle
            disabled={!isSelected}
            value={6}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(6)}
            month="j"
          />
          <MonthCircle
            disabled={!isSelected}
            value={7}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(7)}
            month="j"
          />
          <MonthCircle
            disabled={!isSelected}
            value={8}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(8)}
            month="A"
          />
          <MonthCircle
            disabled={!isSelected}
            value={9}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(9)}
            month="s"
          />
          <MonthCircle
            disabled={!isSelected}
            value={10}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(10)}
            month="o"
          />
          <MonthCircle
            disabled={!isSelected}
            value={11}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(11)}
            month="n"
          />
          <MonthCircle
            disabled={!isSelected}
            value={12}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(12)}
            month="d"
          />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">Period</h5>
        <div className="z-10 col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="start"
            type={MONTHLY}
            value={1}
          >
            at the start of the month
          </PeriodItem>
          <PeriodItem
            checked={isSelected && (period === 2 || period === 0)}
            handleChange={onPeriodChange}
            id="month"
            type={MONTHLY}
            value={2}
          >
            during the month
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 3}
            handleChange={onPeriodChange}
            id="end"
            type={MONTHLY}
            value={3}
          >
            at the end of the month
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
