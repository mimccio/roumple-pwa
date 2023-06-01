import { CheckIcon } from '@heroicons/react/24/outline'
import { cl } from '&/common/utils'
import type { Routine } from '&/modules/routine/types'
import { useCreateChecklistItem } from '&/modules/routine-checklist-item/hooks'

interface Props {
  routine: Routine
}

export function NewChecklistItem({ routine }: Props) {
  const { register, errors, submit, ref, name } = useCreateChecklistItem(routine)

  return (
    <div className="">
      <div className="flex items-center gap-4">
        <form ref={ref} className="flex w-full gap-4" onSubmit={submit}>
          <input
            className="h-10 w-full rounded-md border border-blue-400 px-2"
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