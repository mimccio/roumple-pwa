import { Link } from 'react-router-dom'
import { FolderIcon } from '@heroicons/react/24/solid'
import { FolderIcon as FolderOutlineIcon } from '@heroicons/react/24/outline'

import { NoteFolder } from '@/modules/note-folder/types'

interface Props {
  folder: NoteFolder
}

export function FolderItem({ folder }: Props) {
  const count = folder.noteCount?.[0].count || 0

  return (
    <Link to={`/notes/${folder.id}`} className="flex items-center gap-x-4 p-2">
      <div>
        {count > 0 ? (
          <FolderIcon width={20} className="text-gray-300" />
        ) : (
          <FolderOutlineIcon width={20} className="text-gray-300" />
        )}
      </div>
      <span className="truncate font-semibold text-gray-600">{folder.name}</span>
      {count > 0 && <span className="text-xs text-gray-400">({count})</span>}
    </Link>
  )
}
