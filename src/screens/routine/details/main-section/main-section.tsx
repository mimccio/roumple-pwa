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
    <div className="flex flex-col gap-4 p-4">
      <RoutineName routine={routine} />
      <RoutineDescription routine={routine} />
      <div className="flex justify-center">
        <span className="h-[1px] w-52 rounded-md bg-gray-200" />
      </div>
      <RoutineChecklist routine={routine} date={date} />
    </div>
  )
}
