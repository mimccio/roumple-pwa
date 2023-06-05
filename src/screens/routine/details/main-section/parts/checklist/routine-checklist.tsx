import { useDeleteChecklistItem } from '&/modules/routine-checklist-item/hooks/use-delete-checklist-item'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'
import { useUpsertAction } from '&/modules/routine/hooks'
import { Routine } from '&/modules/routine/types'
import { ChecklistItem } from './checklist-item'
import { NewChecklistItem } from './new-checklist-item'

interface Props {
  routine: Routine
  date: number
}

export function RoutineChecklist({ routine, date }: Props) {
  const { onDelete } = useDeleteChecklistItem(routine)
  const { handleSelectChecklistItem, handleDeleteCheckedItem } = useUpsertAction({ type: routine.type, date })

  const onSelectChecklistItem = (checklistItemId: string) => handleSelectChecklistItem({ routine, checklistItemId })

  const handleDelete = (checklistItemId: string) => {
    handleDeleteCheckedItem({ routine, checklistItemId })
    onDelete(checklistItemId)
  }

  const getText = () => {
    if (routine.type === SCHEDULE_TYPES.monthly) return 'next month'
    if (routine.type === SCHEDULE_TYPES.weekly) return 'next week'
    return 'tomorrow'
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4 2xl:mt-4">
      <div className="flex flex-col">
        <h4 className="font-bold uppercase text-gray-400">Checklist</h4>
        <p className="text-xs text-gray-300">checklist will automatically reset {getText()}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {routine.checklist?.map((checklistItem) => (
          <ChecklistItem
            checklistItem={checklistItem}
            key={checklistItem.id}
            onDelete={handleDelete}
            onSelect={onSelectChecklistItem}
            isChecked={routine.actions?.[0]?.checked_list?.includes(checklistItem.id)}
          />
        ))}
        <NewChecklistItem routine={routine} />
      </div>
    </div>
  )
}
