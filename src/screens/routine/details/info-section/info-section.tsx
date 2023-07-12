import { CreatedAt } from '&/common/components/display/created-at'
import { RoutineStatusSelector } from '&/common/components/inputs/status-selector'
import type { Routine } from '&/modules/routine/types'
import { Priority, RoutineCategory, RoutineSchedule } from './parts'

interface Props {
  routine: Routine
  date: number
}

export function InfoSection({ routine, date }: Props) {
  return (
    <section className="flex flex-col border-b bg-gray-100 p-4">
      <div className="-mx-1 mb-6 flex items-center justify-between">
        <RoutineStatusSelector routine={routine} date={date} />
        <Priority routine={routine} />
      </div>

      <RoutineSchedule routine={routine} date={date} />
      <RoutineCategory routine={routine} />
      <CreatedAt createdAt={routine.created_at} />
    </section>
  )
}
