import { StatusSelector } from '&/common/components/inputs/status-selector'
import { STATUSES } from '&/common/constants/statuses'
import { cl } from '&/common/utils'
import { Routine } from '&/modules/routine/types'
import { CreatedAt } from './created-at'
import { Priority } from './priority'
import { RoutineCategory } from './routine-category'

interface Props {
  routine: Routine
}

export function DetailsSection({ routine }: Props) {
  const isDone = routine.actions?.[0]?.status === STATUSES.done

  console.log('routine :', routine)

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

      <div>
        <RoutineCategory routine={routine} />
      </div>

      <div>
        <CreatedAt createdAt={routine.created_at} />
      </div>
    </section>
  )
}
