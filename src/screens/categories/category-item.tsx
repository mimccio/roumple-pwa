import { useDeleteCategory, useEditCategory } from '&/modules/category/hooks'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { LabelButton } from './label-button'

interface Category {
  name: string
  id: string
  color: string
}

interface Props {
  category: Category
}

export function CategoryItem({ category }: Props) {
  const { handleColorChange, errors, register, submit } = useEditCategory({ category })
  const { onDelete } = useDeleteCategory()

  return (
    <div className="flex items-center justify-between gap-4">
      <LabelButton handleColorChange={handleColorChange} color={category.color} />
      <form className="w-full">
        <input className="h-8 w-full rounded-md px-2" {...register('name')} />
        <input className="h-8 rounded-md px-2" hidden {...register('id')} />
      </form>
      <button onClick={() => onDelete(category)} className="rounded-md p-1">
        <XCircleIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
      </button>
    </div>
  )
}
