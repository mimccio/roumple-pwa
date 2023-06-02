import type { Routine } from '&/modules/routine/types'
import { InfoSection } from './info-section'
import { MainSection } from './main-section'

interface Props {
  routine: Routine
}

export function RoutineDetails({ routine }: Props) {
  return (
    <div className="w-full">
      <InfoSection routine={routine} />
      <MainSection routine={routine} />
    </div>
  )
}
