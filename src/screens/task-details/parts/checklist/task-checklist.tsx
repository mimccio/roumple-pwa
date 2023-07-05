import { SCHEDULE_TYPES } from '&/common/constants'
import type { Task } from '&/modules/task/types'
import { useCheckItem } from '&/modules/task/hooks'
import { useDeleteChecklistItem } from '&/modules/task-checklist-item/hooks'
import { ChecklistItem } from './checklist-item'
import { NewChecklistItem } from './new-checklist-item'

interface Props {
  task: Task
}

export function TaskChecklist({ task }: Props) {
  const { onDelete } = useDeleteChecklistItem(task)
  const { onCheckItem, onRemoveItemId } = useCheckItem(task)

  const handleDelete = (id: string) => {
    onRemoveItemId(id)
    onDelete(id)
  }

  const getText = () => {
    if (task.scheduleType === SCHEDULE_TYPES.monthly) return 'next month'
    if (task.scheduleType === SCHEDULE_TYPES.weekly) return 'next week'
    return 'tomorrow'
  }

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 p-4 2xl:mt-4">
      <div className="flex flex-col">
        <h4 className="font-bold uppercase text-gray-400">Checklist</h4>
        <p className="text-xs text-gray-300">checklist will automatically reset {getText()}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
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
