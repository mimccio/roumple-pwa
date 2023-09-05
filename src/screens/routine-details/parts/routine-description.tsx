import { DocumentEditor } from '&/common/components/document-editor'
import type { Routine } from '&/modules/routine/types'
import { useEditRoutineDescription } from '&/modules/routine/hooks'

interface Props {
  routine: Routine
}

export function RoutineDescription({ routine }: Props) {
  const { submit } = useEditRoutineDescription(routine)

  return <DocumentEditor content={routine.description} id={routine.id} submit={submit} bt />
}
