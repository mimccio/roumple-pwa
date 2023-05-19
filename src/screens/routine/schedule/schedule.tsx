import type { ScheduleType } from '&/modules/routine/types'
import { useSchedule } from '&/modules/routine/hooks/use-schedule'
import { Daily } from './daily'
import { Weekly } from './weekly'

interface Props {
  id: string
  daily_recurrence: number[]
  weekly_recurrence: number[]
  period: number
  type: ScheduleType
}

export function Schedule({ daily_recurrence, period, type, id, weekly_recurrence }: Props) {
  const { dailyRecurrence, currentPeriod, handlePeriodChange, currentType, handleRecurrenceChange, weeklyRecurrence } =
    useSchedule({
      daily_recurrence,
      weekly_recurrence,
      period,
      type,
      id,
    })

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-bold text-gray-400">Schedule</p>
      <div className="flex flex-col gap-4">
        <Daily
          handlePeriodChange={handlePeriodChange}
          handleRecurrenceChange={handleRecurrenceChange}
          period={currentPeriod}
          recurrence={dailyRecurrence}
          type={currentType}
        />
        <Weekly
          handlePeriodChange={handlePeriodChange}
          handleRecurrenceChange={handleRecurrenceChange}
          period={currentPeriod}
          recurrence={weeklyRecurrence}
          type={currentType}
        />
      </div>
    </div>
  )
}
