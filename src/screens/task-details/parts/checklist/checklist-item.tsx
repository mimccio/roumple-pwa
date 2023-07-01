import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEditChecklistItem } from '&/modules/task-checklist-item/hooks'

import { CheckIcon } from '@heroicons/react/24/solid'
import { cl } from '&/common/utils'
import { TaskChecklistItem } from '&/modules/task-checklist-item/types'

interface Props {
  checklistItem: TaskChecklistItem
  onDelete: (id: string) => void
  onCheck: (checklistItem: TaskChecklistItem) => void
}

export function ChecklistItem({ checklistItem, onDelete, onCheck }: Props) {
  const { register, submit } = useEditChecklistItem(checklistItem)
  const handleSelect = () => onCheck(checklistItem)

  return (
    <div className="flex w-full items-center gap-2">
      <button className="group" onClick={handleSelect}>
        <div
          className={cl(
            'flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 transition-colors',
            checklistItem.checked ? 'bg-green-400 group-hover:bg-green-300' : 'group-hover:border-gray-400'
          )}
        >
          <CheckIcon
            height={12}
            width={12}
            className={cl(
              'transition-colors',
              checklistItem.checked ? 'text-white' : 'text-transparent group-hover:text-gray-300'
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
