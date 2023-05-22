import { ClockIcon } from '@heroicons/react/24/outline'

import { useRoutine } from '&/modules/routine/hooks'
import { getPeriodText, getScheduleTypeColor } from '&/modules/routine/utils'
import { Header } from './header'

export function RoutineAction() {
  const { routine } = useRoutine()
  if (!routine) return null

  const ScheduleColor = getScheduleTypeColor(routine.type)
  const periodText = getPeriodText({ type: routine.type, period: routine.period })

  return (
    <>
      <Header routine={routine} />
      <div className="flex flex-col p-4">
        <p className="flex items-center p-4">
          <ClockIcon width={20} className={ScheduleColor} />
          <span className="ml-2 font-semibold text-gray-600">{periodText}</span>
        </p>
        {routine.description && (
          <div className="mt-4">
            <h5 className="mb-2 font-semibold text-gray-400">Description</h5>
            <p className="text-sm text-gray-600">{routine.description}</p>
          </div>
        )}
      </div>
    </>
  )
}
