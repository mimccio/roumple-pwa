import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/24/solid'

import { SCHEDULE_TYPES } from '&/common/constants'
import { cl } from '&/common/utils'
import type { ScheduleType } from '&/common/types'
import { PeriodItem } from './period-item'
import { WeekRecurrence } from './week-recurrence'

interface Props {
  scheduleType: ScheduleType
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

export function Weekly({ recurrence, period, handlePeriodChange, scheduleType, handleRecurrenceChange }: Props) {
  const { t } = useTranslation('schedule')
  const isSelected = scheduleType === SCHEDULE_TYPES.weekly

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: SCHEDULE_TYPES.weekly, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-2 transition-colors md:p-4',
        isSelected ? 'border-transparent bg-sky-100  shadow-md shadow-sky-200' : 'border-sky-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 text-sky-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-sky-700 ">{t('weekly')}</h4>
        <div className="col-span-4 flex gap-2">
          <WeekRecurrence
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(1)}
            value={1}
            disabled={!isSelected}
          >
            {t('odd')}
          </WeekRecurrence>
          <WeekRecurrence
            handleChange={handleRecurrenceChange}
            isSelected={isSelected && recurrence.includes(0)}
            value={0}
            disabled={!isSelected}
          >
            {t('even')}
          </WeekRecurrence>
        </div>
      </div>
      <div className="relative z-10 mt-4 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">{t('period.title')}</h5>
        <div className="col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="week"
            scheduleType={SCHEDULE_TYPES.weekly}
            value={1}
          >
            {t('period.week.duringWeek')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 2}
            handleChange={onPeriodChange}
            id="weekend"
            scheduleType={SCHEDULE_TYPES.weekly}
            value={2}
          >
            {t('period.week.weekend')}
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
