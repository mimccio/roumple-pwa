import { useNavigate } from 'react-router-dom'
import { TagIcon } from '@heroicons/react/20/solid'

import { TW_COLOR_BG_100 } from '&/common/constants/tw-colors'
import { cl } from '&/common/utils'
import { useMainPath } from '&/common/hooks'
import type { Category } from '&/modules/category/types'

interface Props {
  category: Category
  selectedCategory: Category | null
  selectCategory: (category: Category | null) => void
}

export function CategoryItem({ category, selectCategory, selectedCategory }: Props) {
  const navigate = useNavigate()
  const mainPath = useMainPath()
  const bg = TW_COLOR_BG_100[category.color]
  const isSelected = selectedCategory?.id === category.id

  const onSelectCategory = () => {
    if (isSelected) {
      selectCategory(null)
    } else {
      selectCategory(category)
    }
    navigate(mainPath)
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
