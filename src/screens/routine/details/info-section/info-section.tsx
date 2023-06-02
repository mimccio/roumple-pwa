import { StatusSelector } from '&/common/components/inputs/status-selector'
import type { Routine } from '&/modules/routine/types'
import { Priority, RoutineCategory, CreatedAt, RoutineSchedule } from './parts'

interface Props {
  routine: Routine
}

export function InfoSection({ routine }: Props) {
  return (
    <section className="flex flex-col gap-4 border-b bg-gray-100 p-4">
      <div className="flex items-center justify-between">
        <StatusSelector />
        <Priority routine={routine} />
      </div>

      <RoutineSchedule routine={routine} />
      <RoutineCategory routine={routine} />
      <CreatedAt createdAt={routine.created_at} />
    </section>
  )
}
