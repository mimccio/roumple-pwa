import { STATUSES } from '&/common/constants'
import { cl } from '&/common/utils'
import { StatusSelector } from '&/common/components/inputs/status-selector'
import type { Routine } from '&/modules/routine/types'
import { Priority, RoutineCategory, CreatedAt, RoutineSchedule } from './parts'

interface Props {
  routine: Routine
}

export function InfoSection({ routine }: Props) {
  const isDone = routine.actions?.[0]?.status === STATUSES.done

  return (
    <section
      className={cl(
        'flex flex-col gap-4 border-b p-4',
        isDone ? 'border-green-100 bg-green-50' : 'border-gray-200 bg-gray-100'
      )}
    >
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
