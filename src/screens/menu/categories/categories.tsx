import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'

import { useCategories } from '&/modules/category/hooks'
import { CategoryItem } from './category-item'
import { ListSkeleton } from './category-list-skeleton'
import { CategoriesError } from './categories-error'
import { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import { TagIcon } from '@heroicons/react/20/solid'

export function Categories() {
  const { categories, isLoading, error } = useCategories()
  const [category, setCategory] = useAtom(categoryAtom)

  console.log('category :', category)

  const selectCategory = (category: Category | null) => setCategory(category)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between px-4">
        <Link to="/categories">
          <h4 className="text-sm font-bold text-gray-400">CATEGORIES</h4>
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-2 px-2">
        {isLoading && <ListSkeleton />}
        {!isLoading && (
          <button
            onClick={() => selectCategory(null)}
            className="flex h-9 items-center gap-4 rounded-lg px-2 text-sm font-semibold text-gray-400"
          >
            <TagIcon className="text-gray-300" width={20} height={20} />
            <span>all</span>
          </button>
        )}
        {error != null && <CategoriesError />}
        {!error &&
          categories?.map((category) => (
            <CategoryItem key={category.id} category={category} selectCategory={selectCategory} />
          ))}
      </div>
    </div>
  )
}
