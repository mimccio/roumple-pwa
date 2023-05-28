import { TagIcon } from '@heroicons/react/20/solid'
import { Category } from '&/modules/category/types'
import { cl } from '&/common/utils'
import { TW_COLOR_BG_100 } from '&/common/constants'

interface Props {
  category: Category
  selectedCategory: Category | null
  selectCategory: (category: Category | null) => void
}

export function CategoryItem({ category, selectCategory, selectedCategory }: Props) {
  const bg = TW_COLOR_BG_100[category.color]
  const isSelected = selectedCategory?.id === category.id

  const onSelectCategory = () => {
    if (isSelected) {
      selectCategory(null)
    } else {
      selectCategory(category)
    }
  }

  return (
    <button
      onClick={onSelectCategory}
      className={cl(
        'flex h-9 items-center gap-4 rounded-lg px-2 text-sm font-semibold text-gray-500 transition-colors',
        isSelected && bg
      )}
    >
      <TagIcon className={`text-${category.color}-500`} width={20} height={20} />

      <span>{category.name}</span>
    </button>
  )
}
