import { ClockIcon } from '@heroicons/react/24/outline'

import type { Routine } from '&/modules/routine/types'
import { getPeriodText, getScheduleTypeColor } from '&/modules/routine/utils'

interface Props {
  routine: Routine
}

export function RoutineSchedule({ routine }: Props) {
  const periodText = getPeriodText({ type: routine.type, period: routine.period })
  const ScheduleColor = getScheduleTypeColor(routine.type)

  return (
    <p className="items-center4 flex">
      <ClockIcon width={20} className={ScheduleColor} />
      <span className="ml-2 font-semibold text-gray-600">{periodText}</span>
    </p>
  )
}
