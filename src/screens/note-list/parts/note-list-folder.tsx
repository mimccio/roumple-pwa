import { Link } from 'react-router-dom'
import { FolderIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

import { ListSkeleton } from '&/common/components/list-skeleton'
import { useNoteFolder } from '&/modules/note-folder/hooks'
import { useNoteList } from '&/modules/note/hooks/use-note-list'
import { MainError } from '&/screens/errors'
import { NoteListItem } from './note-list-item'

export function NoteListFolder() {
  const { folder, error: folderError } = useNoteFolder()
  const { noteList, isLoading: listIsLoading, error: listError } = useNoteList()

  if (folderError || listError) return <MainError />

  return (
    <>
      <Link to="/notes" className="group flex items-center gap-x-4 p-2 px-4">
        <ChevronLeftIcon width={18} className="text-gray-300 transition-colors  group-hover:text-gray-500" />
        <FolderIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-300" />
        <span className="font-semibold text-gray-500 transition-colors  group-hover:text-gray-400">{folder?.name}</span>
      </Link>

      <div className="flex flex-col gap-2 p-2 px-4">
        {listIsLoading && <ListSkeleton />}
        {noteList?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
