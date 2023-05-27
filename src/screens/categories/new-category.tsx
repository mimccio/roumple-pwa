import { useCreateCategory } from '&/modules/category/hooks'
import { CheckIcon } from '@heroicons/react/24/outline'
import { LabelButton } from './label-button'
import { cl } from '&/common/utils'

interface Props {
  disabled: boolean
}

export function NewCategory({ disabled }: Props) {
  const { register, errors, submit, handleColorChange, ref, name, color } = useCreateCategory()

  return (
    <div className="px-4">
      <p className="mb-2 text-sm font-semibold text-gray-400">New category</p>

      <div className="flex items-center gap-4">
        <LabelButton handleColorChange={handleColorChange} color={color} />
        <form ref={ref} className="flex w-full gap-4" onSubmit={submit}>
          <input
            className="h-8 w-full rounded-md border border-blue-400 px-2"
            {...register('name', {
              required: { value: true, message: 'required' },
              maxLength: { value: 50, message: 'max 50' },
            })}
          />
          <button
            disabled={disabled || !name.length}
            // className="flex h-8 w-8 items-center justify-center rounded-md"
            className={cl(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              name.length >= 1 ? 'text-green-500 disabled:text-gray-300' : 'text-transparent'
            )}
            type="submit"
          >
            <CheckIcon
              // className={cl('flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:text-red-500', name.length >= 1 ? 'text-green-500' : 'text-transparent')}
              width={24}
              height={24}
            />
          </button>
        </form>
      </div>
      <div className="w-ful ml-14 flex h-8 items-end text-red-400">{errors?.name && <p>{errors?.name.message}</p>}</div>
    </div>
  )
}
