import { useDeleteChecklistItem } from '&/modules/routine-checklist-item/hooks/use-delete-checklist-item'
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
  const { handleSelectChecklistItem } = useUpsertAction({ type: routine.type, date })

  const onSelectChecklistItem = (checklistItemId: string) => handleSelectChecklistItem({ routine, checklistItemId })

  return (
    <div className="w-full py-4">
      <h4 className="text-sm font-bold uppercase text-gray-400">Checklist</h4>
      <p className="text-xs text-gray-300">Checklist will be automaticaly reset next month</p>

      <div className="mt-4 flex flex-col gap-2">
        {routine.checklist?.map((checklistItem) => (
          <ChecklistItem
            checklistItem={checklistItem}
            key={checklistItem.id}
            onDelete={onDelete}
            onSelect={onSelectChecklistItem}
            isChecked={routine.actions?.[0]?.checked_list?.includes(checklistItem.id)}
          />
        ))}
        <NewChecklistItem routine={routine} />
      </div>
    </div>
  )
}
