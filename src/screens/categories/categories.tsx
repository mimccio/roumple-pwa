import { useTranslation } from 'react-i18next'

import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { useCategories } from '&/modules/category/hooks'
import { MainError } from '../errors'
import { Header } from './header'
import { CategoryItem } from './category-item'
import { NewCategory } from './new-category'

export function Categories() {
  const { t } = useTranslation('category')
  const { categoryList, isLoading, error } = useCategories()

  return (
    <>
      <Header />
      <ContentLayout>
        {error != null && <MainError />}

        {!error && (
          <>
            <div className="mb-10">
              <NewCategory disabled={isLoading} />
            </div>

            <div className="flex flex-col gap-2 px-4">
              <p className="mb-2 text-sm font-semibold text-gray-400">{t('categoryList')}</p>
              {isLoading && <ListSkeleton />}

              {categoryList?.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          </>
        )}
      </ContentLayout>
    </>
  )
}
