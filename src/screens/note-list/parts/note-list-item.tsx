import { NavLink } from 'react-router-dom'

import { cl } from '&/common/utils'
import type { Note } from '&/modules/note/types'

interface Props {
  note: Note
}

export function NoteListItem({ note }: Props) {
  return (
    <NavLink
      to={`d/note/${note.id}`}
      className={({ isActive }) =>
        cl('flex h-14 items-center justify-between rounded-lg px-2', isActive && 'bg-gray-100')
      }
    >
      {({ isActive }) => (
        <>
          <div>
            <div
              className={cl(
                'h-2 w-2 rounded-full',
                note.category?.color ? `bg-${note.category.color}-500` : 'bg-gray-300'
              )}
            />
          </div>
          <div
            className={cl(
              'mx-4 h-full w-full truncate border-b pt-1',
              isActive ? 'border-transparent' : 'border-gray-100'
            )}
          >
            <p className="truncate font-semibold text-gray-700">{note.title || 'new note'}</p>
            <div className="flex gap-2 text-xs font-semibold text-gray-500">
              <p>{note.category?.name && note.category.name}</p>
            </div>
          </div>
        </>
      )}
    </NavLink>
  )
}
