import { useDeleteChecklistItem } from '&/modules/routine-checklist-item/hooks/use-delete-checklist-item'
import { Routine } from '&/modules/routine/types'
import { ChecklistItem } from './checklist-item'
import { NewChecklistItem } from './new-checklist-item'

interface Props {
  routine: Routine
}

export function RoutineChecklist({ routine }: Props) {
  const { onDelete } = useDeleteChecklistItem(routine)

  return (
    <div className="w-full p-4 py-8">
      <h3 className="mb-8 text-center text-xl font-semibold capitalize text-gray-500">{routine.name}</h3>
      <span className="text-sm font-bold text-gray-400">New checklist item</span>
      <NewChecklistItem routine={routine} />

      <h4 className="text-sm font-bold text-gray-400">Checklist</h4>
      <div className="mt-4 flex flex-col gap-2">
        {routine.checklist?.map((checklistItem) => (
          <ChecklistItem checklistItem={checklistItem} key={checklistItem.id} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
