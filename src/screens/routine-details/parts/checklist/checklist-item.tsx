import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEditChecklistItem } from '@/modules/routine-checklist-item/hooks'
import { RoutineChecklistItem } from '@/modules/routine-checklist-item/types'
import { CheckIcon } from '@heroicons/react/24/solid'
import { cl } from '@/common/utils'

interface Props {
  checklistItem: RoutineChecklistItem
  onDelete: (id: string) => void
  onSelect: (id: string) => void
  isChecked?: boolean
  disabled: boolean
}

export function ChecklistItem({ checklistItem, onDelete, onSelect, isChecked, disabled }: Props) {
  const { register, submit } = useEditChecklistItem(checklistItem)
  const handleSelect = () => onSelect(checklistItem.id)

  return (
    <div className="flex w-full items-center gap-2">
      <button className="group  disabled:animate-pulse" onClick={handleSelect} disabled={disabled}>
        <div
          className={cl(
            'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors enabled:border-gray-300',
            isChecked ? 'bg-green-400 enabled:group-hover:bg-green-300' : ' enabled:group-hover:border-gray-400'
          )}
        >
          <CheckIcon
            height={12}
            width={12}
            className={cl(
              'transition-colors',
              isChecked ? 'text-white' : 'text-transparent  enabled:group-hover:text-gray-300'
            )}
          />
        </div>
      </button>
      <form className="w-full" onSubmit={submit} onBlur={submit}>
        <input
          onClick={(evt) => evt.preventDefault()}
          className="h-8 w-full truncate rounded-md px-2 outline-none transition-colors hover:bg-gray-50 focus:bg-gray-100"
          {...register('name')}
        />
      </form>
      <button onClick={() => onDelete(checklistItem.id)} className="rounded-md p-1">
        <XMarkIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
      </button>
    </div>
  )
}
