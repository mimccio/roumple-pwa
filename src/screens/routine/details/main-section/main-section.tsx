import type { Routine } from '&/modules/routine/types'
import { RoutineName } from './parts/routine-name'
import { RoutineDescription } from './parts/routine-description'

interface Props {
  routine: Routine
}

export function MainSection({ routine }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <RoutineName routine={routine} />
      <RoutineDescription routine={routine} />
    </div>
  )
}
