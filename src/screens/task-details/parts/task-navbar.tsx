import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/modales'

import type { Task } from '&/modules/task/types'
import { useDeleteTask } from '&/modules/task/hooks'
import { LinkNote } from './link-note'
import { useState } from 'react'

interface Props {
  task?: Task
  isLoading: boolean
}

export function TaskNavbar({ task, isLoading }: Props) {
  const { onDelete, isOpen, open, close } = useDeleteTask()
  const [linkSelectorIsOpen, setLinkSelectorIsOpen] = useState(false)

  return (
    <DetailsNavbar>
      <h4 className="text-sm font-semibold text-gray-500">Task</h4>
      <div className="flex gap-x-2">
        <ItemMenu onDelete={open} withCopyLink isLoading={isLoading} onLinkNote={() => setLinkSelectorIsOpen(true)} />
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

        <LinkNote isOpen={linkSelectorIsOpen} close={() => setLinkSelectorIsOpen(false)} />
      </div>
    </DetailsNavbar>
  )
}
