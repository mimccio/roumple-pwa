import { NavLink } from 'react-router-dom'
import { format } from 'date-fns'
import { FolderIcon, TagIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

import { cl, getTwColor } from '&/common/utils'
import type { Note } from '&/modules/note/types'

interface Props {
  note: Note
}

export function NoteListItem({ note }: Props) {
  const createdAt = note.created_at ? format(new Date(note.created_at), 'dd/MM/yy') : null
  const iconColor = note.category ? getTwColor('text', note.category?.color, 500) : 'text-gray-300'

  return (
    <NavLink
      to={`d/note/${note.id}`}
      className={({ isActive }) =>
        cl(
          'flex h-14 items-center justify-between rounded-lg px-2 transition-colors',
          isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
        )
      }
    >
      {({ isActive }) => (
        <>
          <div>
            <DocumentTextIcon height={16} className={iconColor} />
          </div>
          <div
            className={cl(
              'mx-4 flex h-full w-full flex-col justify-between truncate border-b py-1',
              isActive ? 'border-transparent' : 'border-gray-50'
            )}
          >
            <p className="truncate font-semibold text-gray-700">{note.title || 'new note'}</p>
            <div className="flex justify-between gap-2  text-xs font-semibold text-gray-400">
              <p className="flex items-end gap-4">
                <span className="flex items-center gap-1">
                  <TagIcon width={12} className="text-gray-300" />
                  <span className={cl(!note.category?.name && 'text-gray-300')}>
                    {note.category?.name || 'no category'}
                  </span>
                </span>

                {note.folder?.name && (
                  <span className="flex items-center gap-1">
                    <FolderIcon width={12} className="text-gray-300" /> {note.folder.name}
                  </span>
                )}
              </p>
              <p className="text-2xs font-semibold text-gray-300">{createdAt}</p>
            </div>
          </div>
        </>
      )}
    </NavLink>
  )
}
