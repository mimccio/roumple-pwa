import { useTranslation } from 'react-i18next'
import type { ScheduleType } from '&/common/types'
import { Daily } from './daily'
import { Weekly } from './weekly'
import { Monthly } from './monthly'

interface Props {
  currentPeriod: number
  currentType: ScheduleType
  dailyRecurrence: number[]
  monthlyRecurrence: number[]
  weeklyRecurrence: number[]
  handlePeriodChange: ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => void
  handleRecurrenceChange: ({
    scheduleType,
    recurrenceNum,
  }: {
    scheduleType: ScheduleType
    recurrenceNum: number
  }) => void
}

export function RoutineScheduleSelector({
  currentPeriod,
  currentType,
  dailyRecurrence,
  handlePeriodChange,
  handleRecurrenceChange,
  monthlyRecurrence,
  weeklyRecurrence,
}: Props) {
  const { t } = useTranslation('schedule')
  return (
    <div className="">
      <p className="mb-2 text-sm font-bold text-gray-400">{t('schedule')}</p>
      <div className="flex flex-col gap-y-2 md:gap-y-4">
        <Daily
          handlePeriodChange={handlePeriodChange}
          handleRecurrenceChange={handleRecurrenceChange}
          period={currentPeriod}
          recurrence={dailyRecurrence}
          scheduleType={currentType}
        />
        <Weekly
          handlePeriodChange={handlePeriodChange}
          handleRecurrenceChange={handleRecurrenceChange}
          period={currentPeriod}
          recurrence={weeklyRecurrence}
          scheduleType={currentType}
        />
        <Monthly
          handlePeriodChange={handlePeriodChange}
          handleRecurrenceChange={handleRecurrenceChange}
          period={currentPeriod}
          recurrence={monthlyRecurrence}
          scheduleType={currentType}
        />
      </div>
    </div>
  )
}
