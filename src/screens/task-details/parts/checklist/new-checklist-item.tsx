import { CheckIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import type { Task } from '&/modules/task/types'
import { useCreateChecklistItem } from '&/modules/task-checklist-item/hooks'

interface Props {
  task: Task
}

export function NewChecklistItem({ task }: Props) {
  const { register, errors, submit, ref, name } = useCreateChecklistItem(task)

  return (
    <div className="">
      <div className="flex items-center gap-4">
        <form ref={ref} className="flex w-full items-center gap-4" onSubmit={submit}>
          <label
            htmlFor="new-checklist-element"
            className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400"
          >
            <PlusIcon width={20} height={20} />
          </label>
          <input
            id="new-checklist-element"
            className="h-8 w-full rounded-md border border-transparent px-2 text-sm outline-none transition-colors hover:bg-gray-50 focus:bg-gray-100"
            placeholder="New checklist element"
            {...register('name', {
              required: { value: true, message: 'required' },
              maxLength: { value: 50, message: 'max 50' },
            })}
          />
          <button
            disabled={!name.length}
            className={cl(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              name.length >= 1 ? 'text-green-500 disabled:text-gray-300' : 'text-transparent'
            )}
            type="submit"
          >
            <CheckIcon width={24} height={24} />
          </button>
        </form>
      </div>
      <div className="w-ful ml-14 flex h-8 items-end text-red-400">{errors?.name && <p>{errors?.name.message}</p>}</div>
    </div>
  )
}
