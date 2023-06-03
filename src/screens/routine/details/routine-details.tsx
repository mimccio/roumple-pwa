import type { Routine } from '&/modules/routine/types'
import { InfoSection } from './info-section'
import { MainSection } from './main-section'

interface Props {
  routine: Routine
  date: number
}

export function RoutineDetails({ routine, date }: Props) {
  return (
    <div className="w-full">
      <InfoSection routine={routine} date={date} />
      <MainSection routine={routine} date={date} />
    </div>
  )
}
