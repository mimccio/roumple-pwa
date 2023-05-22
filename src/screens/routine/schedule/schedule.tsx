import type { Routine } from '&/modules/routine/types'
import { useSchedule } from '&/modules/routine/hooks/use-schedule'
import { Daily } from './daily'
import { Weekly } from './weekly'
import { Monthly } from './monthly'

interface Props {
  routine: Routine
}

export function Schedule({ routine }: Props) {
  const {
    dailyRecurrence,
    currentPeriod,
    handlePeriodChange,
    currentType,
    handleRecurrenceChange,
    weeklyRecurrence,
    monthlyRecurrence,
  } = useSchedule(routine)

  return (
    <div className="mt-8">
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
        <Monthly
          handlePeriodChange={handlePeriodChange}
          handleRecurrenceChange={handleRecurrenceChange}
          period={currentPeriod}
          recurrence={monthlyRecurrence}
          type={currentType}
        />
      </div>
    </div>
  )
}
