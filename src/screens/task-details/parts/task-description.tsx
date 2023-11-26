import { DocumentEditor } from '&/common/components/document-editor'
import type { Task } from '&/modules/task/types'
import { useEditTaskDescription } from '&/modules/task/hooks'

interface Props {
  task: Task
}

export function TaskDescription({ task }: Props) {
  const { submit } = useEditTaskDescription(task)

  return <DocumentEditor content={task.description} id={task.id} submit={submit} />
}
