import { Link } from 'react-router-dom'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

import { Note } from '&/modules/note/types'
import { getTwColor } from '&/common/utils'

interface Props {
  note: Note
}

export function InboxPreviewItem({ note }: Props) {
  const iconColor = note.category ? getTwColor('text', note.category?.color, 400) : 'text-gray-300'

  return (
    <Link
      to={`d/note/${note.id}`}
      className="flex items-center gap-x-4 px-2 py-1 text-gray-600 transition-colors hover:text-gray-500"
    >
      <DocumentTextIcon width={20} className={iconColor} />
      <span className="truncate font-semibold ">{note.title || 'new note'}</span>
    </Link>
  )
}
