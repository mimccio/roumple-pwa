import type { Routine } from '@/modules/routine/types'
import { NameEditor } from '@/common/components/editors'
import { useEditRoutineName } from '@/modules/routine/hooks/use-edit-routine-name'

interface Props {
  routine: Routine
}

export function RoutineName({ routine }: Props) {
  const { submit } = useEditRoutineName(routine)

  return <NameEditor id={routine.id} name={routine.name} submit={submit} />
}
