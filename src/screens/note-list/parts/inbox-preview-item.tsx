import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

import { Note } from '&/modules/note/types'
import { cl, getTwColor } from '&/common/utils'

interface Props {
  note: Note
}

export function InboxPreviewItem({ note }: Props) {
  const { t } = useTranslation('note')
  const iconColor = note.category ? getTwColor('text', note.category?.color, 400) || 'text-gray-300' : 'text-gray-300'

  return (
    <Link to={`d/note/${note.id}`} className="flex items-center gap-x-4 px-2 py-1">
      <DocumentTextIcon width={20} className={cl('transition-colors', iconColor)} />
      <span
        className={cl(
          'truncate font-semibold transition-colors hover:text-gray-500',
          note.title ? 'text-gray-600' : 'text-gray-400'
        )}
      >
        {note.title || t('new note')}
      </span>
    </Link>
  )
}
