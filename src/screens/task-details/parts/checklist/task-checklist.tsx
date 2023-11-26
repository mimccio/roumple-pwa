import { useTranslation } from 'react-i18next'
import type { Task } from '&/modules/task/types'
import { useCheckItem } from '&/modules/task/hooks'
import { useDeleteChecklistItem } from '&/modules/task-checklist-item/hooks'
import { ChecklistItem } from './checklist-item'
import { NewChecklistItem } from './new-checklist-item'

interface Props {
  task: Task
}

export function TaskChecklist({ task }: Props) {
  const { t } = useTranslation('common')
  const { onDelete } = useDeleteChecklistItem(task)
  const { onCheckItem, onRemoveItemId } = useCheckItem(task)

  const handleDelete = (id: string) => {
    onRemoveItemId(id)
    onDelete(id)
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-5xl border-b px-4">
      <div className="flex flex-col">
        <h4 className="font-semibold text-gray-400">{t('checklist')}</h4>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {task.checklist?.map((checklistItem) => (
          <ChecklistItem
            checklistItem={checklistItem}
            key={checklistItem.id}
            onDelete={() => handleDelete(checklistItem.id)}
            onCheck={() => onCheckItem(checklistItem.id)}
            checked={task.checkedItemIds?.includes(checklistItem.id)}
          />
        ))}
        <NewChecklistItem task={task} />
      </div>
    </div>
  )
}
