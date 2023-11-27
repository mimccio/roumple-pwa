import { TagIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'

import { TW_COLOR_TEXT_500 } from '@/common/constants'
import { cl } from '@/common/utils'
import { categoryAtom } from '@/modules/category/atoms'

export function CategoryBtn() {
  const [category, setCategory] = useAtom(categoryAtom)

  return (
    <button disabled={!category} onClick={() => setCategory(null)} className="p-2">
      <TagIcon
        width={20}
        className={cl('transition-colors', category?.color ? TW_COLOR_TEXT_500[category.color] : 'text-gray-300')}
      />
    </button>
  )
}
