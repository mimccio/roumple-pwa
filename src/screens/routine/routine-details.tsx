import type { Routine } from '&/modules/routine/types'
import { DetailsSection } from './parts/details-section'

interface Props {
  routine: Routine
}

export function RoutineDetails({ routine }: Props) {
  return (
    <div className="w-full">
      <DetailsSection routine={routine} />
    </div>
  )
}
