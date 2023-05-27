import { TagIcon } from '@heroicons/react/20/solid'
import { Category } from '&/modules/category/types'

interface Props {
  category: Category
  selectCategory: (category: Category) => void
}

export function CategoryItem({ category, selectCategory }: Props) {
  return (
    <button
      onClick={() => selectCategory(category)}
      className="flex h-9 items-center gap-4 rounded-lg px-2 text-sm font-semibold text-gray-600"
    >
      <TagIcon className={`text-${category.color}-500`} width={20} height={20} />
      <span>{category.name}</span>
    </button>
  )
}
