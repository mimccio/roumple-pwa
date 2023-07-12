import { Routine, UpdateStatusParams } from '&/modules/routine/types'
import { TaskListItem } from '&/modules/task/components'
import { Task } from '&/modules/task/types'
import { RoutineActionListItem } from '.'

interface Props {
  item: Task | Routine
  handleUpdateRoutineStatus: ({ routine, actionId, status }: UpdateStatusParams) => void
}

export function ListItem({ item, handleUpdateRoutineStatus }: Props) {
  if (Object.prototype.hasOwnProperty.call(item, 'status')) {
    return <TaskListItem key={item.id} task={item as Task} />
  } else {
    return (
      <RoutineActionListItem key={item.id} routine={item as Routine} handleUpdateStatus={handleUpdateRoutineStatus} />
    )
  }
}
