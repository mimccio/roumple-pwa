import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { ScheduleType } from '&/common/types'
import { PeriodItem } from './period-item'
import { MonthCircle } from './month-circle'
import { SCHEDULE_TYPES } from '&/common/constants'

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

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export function Monthly({ recurrence, period, handlePeriodChange, scheduleType, handleRecurrenceChange }: Props) {
  const { t } = useTranslation('schedule')
  const isSelected = scheduleType === SCHEDULE_TYPES.monthly

  const onPeriodChange = (evt: FormEvent<HTMLInputElement>) => {
    handlePeriodChange({ scheduleType: SCHEDULE_TYPES.monthly, period: Number(evt.currentTarget.value) })
  }

  return (
    <div
      className={cl(
        'relative rounded-lg border-2 p-2 transition-colors md:p-4',
        isSelected ? 'border-transparent bg-purple-100  shadow-md shadow-purple-200' : 'border-purple-200'
      )}
    >
      {isSelected && <CheckIcon width={80} className="absolute bottom-4 right-4 z-0 text-purple-200" />}
      <div className="grid grid-cols-6">
        <h4 className="col-span-2 text-sm font-bold text-purple-700 ">{t('monthly')}</h4>
        <div className="col-span-4 flex flex-wrap gap-1">
          {months.map((month, index) => (
            <MonthCircle
              key={index}
              disabled={!isSelected}
              value={index}
              handleChange={handleRecurrenceChange}
              isSelected={isSelected && recurrence.includes(index)}
              month={month}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-6">
        <h5 className="col-span-2 mr-20 text-sm font-semibold text-gray-700">{t('period.title')}</h5>
        <div className="relative z-10 col-span-4">
          <PeriodItem
            checked={isSelected && period === 1}
            handleChange={onPeriodChange}
            id="start"
            scheduleType={SCHEDULE_TYPES.monthly}
            value={1}
          >
            {t('period.month.start')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && (period === 2 || period === 0)}
            handleChange={onPeriodChange}
            id="month"
            scheduleType={SCHEDULE_TYPES.monthly}
            value={2}
          >
            {t('period.month.duringMonth')}
          </PeriodItem>
          <PeriodItem
            checked={isSelected && period === 3}
            handleChange={onPeriodChange}
            id="end"
            scheduleType={SCHEDULE_TYPES.monthly}
            value={3}
          >
            {t('period.month.end')}
          </PeriodItem>
        </div>
      </div>
    </div>
  )
}
