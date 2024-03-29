import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/modales'

import type { Task } from '&/modules/task/types'
import { useDeleteTask, useEditTaskShowChecklist } from '&/modules/task/hooks'

import { CreateTaskNote } from './create-task-note'

interface Props {
  task?: Task
  isLoading: boolean
}

export function TaskHeader({ task, isLoading }: Props) {
  const { t } = useTranslation('common')
  const { onDelete, isOpen, open, close } = useDeleteTask()
  const [linkSelectorIsOpen, setLinkSelectorIsOpen] = useState(false)
  const { toggleShowChecklist } = useEditTaskShowChecklist()

  return (
    <DetailsNavbar>
      <h4 className="text-sm font-semibold text-gray-500">{t('task')}</h4>
      <div className="flex gap-x-2">
        <ItemMenu
          onDelete={open}
          withCopyLink
          isLoading={isLoading}
          disabled={!task}
          onLinkNote={() => setLinkSelectorIsOpen(true)}
          onToggleShowChecklist={task ? () => toggleShowChecklist(task.showChecklist) : undefined}
          checklistIsDisplayed={task?.showChecklist}
        />
        <CloseNavBtn />
        {task && (
          <>
            <ConfirmDeleteModale
              isOpen={isOpen}
              onDelete={() => onDelete(task)}
              close={close}
              title="Delete task"
              description="Are you sure you want to delete this task? This action cannot be undone."
            />
            <CreateTaskNote isOpen={linkSelectorIsOpen} close={() => setLinkSelectorIsOpen(false)} task={task} />
          </>
        )}
      </div>
    </DetailsNavbar>
  )
}
