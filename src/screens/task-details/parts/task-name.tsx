import { NameEditor } from '@/common/components/editors'
import type { Task } from '@/modules/task/types'
import { useEditTaskName } from '@/modules/task/hooks'

interface Props {
  task: Task
}

export function TaskName({ task }: Props) {
  const { submit } = useEditTaskName(task)

  return <NameEditor id={task.id} name={task.name} submit={submit} />
}
