import { cl, getTwColor } from '&/common/utils'
import { TemplateNote } from '&/modules/template/types'
import { FolderIcon, TagIcon } from '@heroicons/react/24/outline'

interface Props {
  note: TemplateNote
}

export function NoteListItem({ note }: Props) {
  const categoryBg = note.templateCategory?.color ? getTwColor('bg', note.templateCategory.color, 500) : 'bg-gray-300'

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-100 p-2">
      <div className="flex  items-center gap-x-4">
        <div>
          <div className={cl('h-2 w-2 rounded-full', categoryBg || '')} />
        </div>
        <p className={cl('line-clamp-2', !note.title && 'text-gray-500')}>{note.title || 'New note'}</p>
      </div>
      <div className="flex gap-x-2 text-gray-500">
        {note.folder && (
          <span className="ml-2 flex items-center gap-x-2 text-sm font-semibold">
            <FolderIcon className="w-3" />
            <span className="whitespace-nowrap">{note.folder.name}</span>
          </span>
        )}
        <span
          className={cl(
            'ml-2 flex items-center gap-x-2 text-sm font-semibold',
            !note.templateCategory?.name && 'text-gray-300'
          )}
        >
          <TagIcon className="w-3" />
          <span className="whitespace-nowrap">{note.templateCategory?.name || 'no category'}</span>
        </span>
      </div>
    </div>
  )
}
