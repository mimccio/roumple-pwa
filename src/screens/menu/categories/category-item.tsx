import { TagIcon } from '@heroicons/react/20/solid'
import { Category } from '&/modules/category/types'
import { cl } from '&/common/utils'
import { TW_COLOR_BG_100 } from '&/common/constants'

interface Props {
  category: Category
  selectedCategory: Category | null
  selectCategory: (category: Category) => void
}

export function CategoryItem({ category, selectCategory, selectedCategory }: Props) {
  const bg = TW_COLOR_BG_100[category.color]

  return (
    <button
      onClick={() => selectCategory(category)}
      className={cl(
        'flex h-9 items-center gap-4 rounded-lg px-2 text-sm font-semibold text-gray-500 transition-colors',
        selectedCategory?.id === category.id && bg
      )}
    >
      <TagIcon className={`text-${category.color}-500`} width={20} height={20} />

      <span>{category.name}</span>
    </button>
  )
}
