import { Link } from 'react-router-dom'
import { FolderIcon } from '@heroicons/react/24/solid'
import { NoteFolder } from '&/modules/note-folder/types'

interface Props {
  folder: NoteFolder
}

export function FolderItem({ folder }: Props) {
  return (
    <Link to={`/notes/${folder.id}`} className="flex items-center gap-x-4 p-2">
      <FolderIcon width={20} className="text-gray-300" />
      <span className="truncate font-semibold text-gray-600">{folder.name}</span>
      <span className="text-xs text-gray-400">({folder.noteCount?.[0].count})</span>
    </Link>
  )
}
