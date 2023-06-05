import type { Routine } from '&/modules/routine/types'
import { RoutineName } from './parts/routine-name'
import { RoutineDescription } from './parts/routine-description'
import { RoutineChecklist } from './parts/checklist/routine-checklist'

interface Props {
  routine: Routine
  date: number
}

export function MainSection({ routine, date }: Props) {
  return (
    <div className="divider mb-4 flex flex-col gap-4">
      <RoutineName routine={routine} />
      <RoutineDescription routine={routine} />
      <RoutineChecklist routine={routine} date={date} />
    </div>
  )
}
