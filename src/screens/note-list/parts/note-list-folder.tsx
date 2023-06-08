import { Link } from 'react-router-dom'
import { FolderIcon } from '@heroicons/react/24/outline'

import { ListSkeletonSmall } from '&/common/components/list-skeleton-small'
import { useNoteFolder } from '&/modules/note-folder/hooks'
import { useNoteList } from '&/modules/note/hooks/use-note-list'
import { MainError } from '&/screens/errors'
import { NoteListItem } from './note-list-item'

export function NoteListFolder() {
  const { folder, isLoading: folderIsLoading, error: folderError } = useNoteFolder()
  const { noteList, isLoading: listIsLoading, error: listError } = useNoteList()

  if (folderIsLoading || listIsLoading) {
    return (
      <div>
        <ListSkeletonSmall />
      </div>
    )
  }

  if (folderError || listError) return <MainError />

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Link to="/notes/folders" className="flex items-center gap-x-4 p-2">
          <FolderIcon width={20} className="text-gray-500" />
          <span className="font-semibold text-gray-600">{folder?.name}</span>
        </Link>
      </div>
      {noteList?.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </div>
  )
}
