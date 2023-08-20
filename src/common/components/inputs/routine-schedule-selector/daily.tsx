import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/24/solid'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'

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
  const { t } = useTranslation('schedule')
  const isSelected = type === SCHEDULE_TYPES.daily

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: SCHEDULE_TYPES.daily, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-2 transition-colors md:p-4',
        isSelected ? 'border-transparent bg-indigo-100 shadow-md shadow-indigo-200' : 'border-indigo-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-indigo-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-indigo-700">{t('daily')}</h4>
        <div className="col-span-4 flex gap-2">
          <DayCircle
            disabled={!isSelected}
            value={1}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(1)}
            day={t('days.1')}
          />
          <DayCircle
            disabled={!isSelected}
            value={2}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(2)}
            day={t('days.2')}
          />
          <DayCircle
            disabled={!isSelected}
            value={3}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(3)}
            day={t('days.3')}
          />
          <DayCircle
            disabled={!isSelected}
            value={4}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(4)}
            day={t('days.4')}
          />
          <DayCircle
            disabled={!isSelected}
            value={5}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(5)}
            day={t('days.5')}
          />
          <DayCircle
            disabled={!isSelected}
            value={6}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(6)}
            day={t('days.6')}
          />
          <DayCircle
            disabled={!isSelected}
            value={0}
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(0)}
            day={t('days.7')}
          />
        </div>
      </div>
      <div className="relative z-10 mt-4 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">{t('period.title')}</h5>
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="morning"
            type={SCHEDULE_TYPES.daily}
            value={1}
          >
            {t('period.day.morning')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={onPeriodChange}
            id="lunch"
            type={SCHEDULE_TYPES.daily}
            value={2}
          >
            {t('period.day.lunchTime')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && (period === 3 || period === 0)}
            handleChange={onPeriodChange}
            id="day"
            type={SCHEDULE_TYPES.daily}
            value={3}
          >
            {t('period.day.duringDay')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 4}
            handleChange={onPeriodChange}
            id="evening"
            type={SCHEDULE_TYPES.daily}
            value={4}
          >
            {t('period.day.evening')}
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
