import { XCircleIcon } from '@heroicons/react/20/solid'
import { useEditChecklistItem } from '&/modules/routine-checklist-item/hooks'
import { RoutineChecklistItem } from '&/modules/routine-checklist-item/types'
import { CheckIcon } from '@heroicons/react/24/solid'
import { cl } from '&/common/utils'

interface Props {
  checklistItem: RoutineChecklistItem
  onDelete: (id: string) => void
  onSelect: (id: string) => void
  isChecked?: boolean
}

export function ChecklistItem({ checklistItem, onDelete, onSelect, isChecked }: Props) {
  const { register, submit } = useEditChecklistItem(checklistItem)
  const handleSelect = () => onSelect(checklistItem.id)

  return (
    <form onSubmit={submit} onBlur={submit} className="flex w-full items-center justify-between gap-2">
      <button className="group" onClick={handleSelect}>
        <div
          className={cl(
            'flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 transition-colors',
            isChecked ? 'bg-green-400 group-hover:bg-green-300' : 'group-hover:border-gray-400'
          )}
        >
          <CheckIcon
            height={12}
            width={12}
            className={cl('transition-colors', isChecked ? 'text-white' : 'text-transparent group-hover:text-gray-300')}
          />
        </div>
      </button>
      <input
        className="h-8 w-full rounded-md border border-transparent px-2 outline-none focus:border-gray-200"
        {...register('name')}
      />
      <button onClick={() => onDelete(checklistItem.id)} className="rounded-md p-1">
        <XCircleIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
      </button>
    </form>
  )
}
