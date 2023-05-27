import { useCategories } from '&/modules/category/hooks'
import { Link } from 'react-router-dom'
import { CategoryItem } from './category-item'
import { ListSkeleton } from './category-list-skeleton'
import { CategoriesError } from './categories-error'

export function Categories() {
  const { categories, isLoading, error } = useCategories()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between px-4">
        <Link to="/categories">
          <h4 className="text-sm font-bold text-gray-400">CATEGORIES</h4>
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-2 px-2">
        {isLoading && <ListSkeleton />}
        {error != null && <CategoriesError />}
        {!error && categories?.map((category) => <CategoryItem category={category} />)}
      </div>
    </div>
  )
}
