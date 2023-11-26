import { cl, getTwColor } from '&/common/utils'
import { TemplateRoutine, TemplateTask } from '&/modules/template/types'
import { TagIcon } from '@heroicons/react/24/outline'

interface Props {
  item: TemplateRoutine | TemplateTask
}

export function ListItem({ item }: Props) {
  const categoryBg = item.templateCategory?.color ? getTwColor('bg', item.templateCategory.color, 500) : 'bg-gray-300'

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-100 p-2">
      <div className="flex  items-center gap-x-4">
        <div>
          <div className={cl('h-2 w-2 rounded-full', categoryBg || '')} />
        </div>
        <p className="line-clamp-2">{item.name}</p>
      </div>
      <span
        className={cl(
          'ml-2 flex items-center gap-x-2 text-sm font-semibold',
          item.templateCategory?.name ? 'text-gray-500' : 'text-gray-300'
        )}
      >
        <TagIcon className="w-3" />
        <span className="whitespace-nowrap">{item.templateCategory?.name || 'no category'}</span>
      </span>
    </div>
  )
}
