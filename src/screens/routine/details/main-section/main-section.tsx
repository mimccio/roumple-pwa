import type { Routine } from '&/modules/routine/types'
import { RoutineName } from './parts/routine-name'
import { RoutineDescription } from './parts/routine-description'
import { RoutineChecklist } from './parts/checklist/routine-checklist'
import { RoutineNotes } from './parts/routine-notes'

interface Props {
  routine: Routine
  date: number
}

export function MainSection({ routine, date }: Props) {
  return (
    <div className="mb-14 flex flex-1 flex-col gap-2">
      <RoutineName routine={routine} />
      <RoutineDescription routine={routine} />
      <RoutineChecklist routine={routine} date={date} />
      <RoutineNotes />
    </div>
  )
}
