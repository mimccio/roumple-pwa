import { Link } from 'react-router-dom'
import { FolderIcon } from '@heroicons/react/24/outline'

interface Props {
  id: string
  name: string
}

export function FolderItem({ id, name }: Props) {
  return (
    <Link to={`/notes/${id}`} className="flex items-center gap-x-4 p-2">
      <FolderIcon width={20} className="text-gray-500" />
      <span className="truncate font-semibold text-gray-600">{name}</span>
    </Link>
  )
}
