import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'
import { TagIcon } from '@heroicons/react/20/solid'

import type { Category } from '@/modules/category/types'
import { categoryAtom } from '@/modules/category/atoms'
import { useCategories } from '@/modules/category/hooks'
import { CategoriesError } from './categories-error'
import { CategoryItem } from './category-item'
import { ListSkeleton } from './category-list-skeleton'

interface Props {
  close: () => void
}

export function Categories({ close }: Props) {
  const { t } = useTranslation('common')
  const { categoryList, isLoading, error } = useCategories()
  const [selectedCategory, setCategory] = useAtom(categoryAtom)
  const selectCategory = (category: Category | null) => setCategory(category)

  const onAllClick = () => {
    selectCategory(null)
    close()
  }

  return (
    <div className="flex-1 py-4">
      <div className="flex items-center justify-between px-4">
        <Link to="/categories" onClick={close}>
          <h4 className="text-sm font-bold uppercase text-gray-400">{t('categories')}</h4>
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2 px-2">
        {isLoading && <ListSkeleton />}
        {!isLoading && (
          <button
            onClick={onAllClick}
            className="flex h-9 items-center gap-4 rounded-lg px-2 text-sm font-semibold text-gray-400"
          >
            <TagIcon className="text-gray-300" width={20} height={20} />
            <span>{t('all')}</span>
          </button>
        )}
        {error != null && <CategoriesError />}
        {!error &&
          categoryList?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              selectCategory={selectCategory}
              selectedCategory={selectedCategory}
              close={close}
            />
          ))}
      </div>
    </div>
  )
}
