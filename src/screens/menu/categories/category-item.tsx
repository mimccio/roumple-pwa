import { TagIcon } from '@heroicons/react/20/solid'
import { Category } from '&/modules/category/types'

interface Props {
  category: Category
}

export function CategoryItem({ category }: Props) {
  return (
    <div className="flex h-9 items-center gap-4 rounded-lg px-2 text-sm font-semibold text-gray-600">
      <TagIcon className={`text-${category.color}-500`} width={20} height={20} />
      <span>{category.name}</span>
    </div>
  )
}
