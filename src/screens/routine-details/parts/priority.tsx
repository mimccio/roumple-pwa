import { PrioritySelector } from '@/common/components/inputs/priority-selector'
import { useRoutinePriority } from '@/modules/routine/hooks'
import { Routine } from '@/modules/routine/types'

interface Props {
  routine: Routine
}

export function Priority({ routine }: Props) {
  const { onSelect } = useRoutinePriority(routine)

  return (
    <div>
      <PrioritySelector priority={routine.priority} onSelect={onSelect} />
    </div>
  )
}
