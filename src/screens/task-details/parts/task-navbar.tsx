import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/modales'

import type { Task } from '&/modules/task/types'
import { useDeleteTask } from '&/modules/task/hooks'

interface Props {
  task?: Task
  isLoading: boolean
}

export function TaskNavbar({ task, isLoading }: Props) {
  const { onDelete, isOpen, open, close } = useDeleteTask()

  return (
    <DetailsNavbar>
      <div>
        <ItemMenu onDelete={open} withCopyLink isLoading={isLoading} />
      </div>
      <CloseNavBtn />
      {task && (
        <ConfirmDeleteModale
          isOpen={isOpen}
          onDelete={() => onDelete(task)}
          close={close}
          title="Delete task"
          description="Are you sure you want to delete this task? This action cannot be undone."
        />
      )}
    </DetailsNavbar>
  )
}
