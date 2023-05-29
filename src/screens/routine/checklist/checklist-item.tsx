import { XCircleIcon } from '@heroicons/react/20/solid'
import { useEditChecklistItem } from '&/modules/routine-checklist-item/hooks'
import { RoutineChecklistItem } from '&/modules/routine-checklist-item/types'

interface Props {
  checklistItem: RoutineChecklistItem
  onDelete: (id: string) => void
}

export function ChecklistItem({ checklistItem, onDelete }: Props) {
  const { register, submit } = useEditChecklistItem(checklistItem)

  return (
    <form onSubmit={submit} onBlur={submit} className="flex w-full items-center justify-between gap-4">
      <input className="h-8 w-full rounded-md border px-2" {...register('name')} />
      <button onClick={() => onDelete(checklistItem.id)} className="rounded-md p-1">
        <XCircleIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
      </button>
    </form>
  )
}
