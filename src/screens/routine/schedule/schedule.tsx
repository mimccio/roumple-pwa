import type { ScheduleType } from '&/modules/routine/types'
import { useSchedule } from '&/modules/routine/hooks/use-schedule'
import { Daily } from './daily'

interface Props {
  id: string
  recurrence: boolean[]
  period: number
  type: ScheduleType
}

export function Schedule({ recurrence, period, type, id }: Props) {
  const { currentRecurrence, currentPeriod, handlePeriodChange, currentType, handleRecurrenceChange } = useSchedule({
    recurrence,
    period,
    type,
    id,
  })

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-bold text-gray-400">Schedule</p>
      <form className="flex flex-col gap-4">
        <Daily
          recurrence={currentRecurrence}
          period={currentPeriod}
          handlePeriodChange={handlePeriodChange}
          type={currentType}
          handleRecurrenceChange={handleRecurrenceChange}
        />
      </form>
    </div>
  )
}
