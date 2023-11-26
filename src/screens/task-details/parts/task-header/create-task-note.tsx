import { LinkNote } from '&/common/components/forms'
import { useCreateTaskNote } from '&/modules/task-note/hooks'
import { Task } from '&/modules/task/types'

interface Props {
  task: Task
  isOpen: boolean
  close: () => void
}

export function CreateTaskNote({ task, isOpen, close }: Props) {
  const { onCreate } = useCreateTaskNote(task)
  return <LinkNote isOpen={isOpen} close={close} onLinkNote={onCreate} />
}
