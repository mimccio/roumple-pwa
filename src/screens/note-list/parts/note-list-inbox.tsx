import { ListSkeleton } from '&/common/components/list-skeleton'
import { useNoteList } from '&/modules/note/hooks'
import { MainError } from '&/screens/errors'
import { InboxIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { NoteListItem } from './note-list-item'

export function NoteListInbox() {
  const { noteList, isLoading, error } = useNoteList()

  if (error) return <MainError />

  return (
    <>
      <div className="flex items-center justify-between">
        <Link to="/notes" className="flex items-center gap-x-4 p-2">
          <InboxIcon width={20} className="text-gray-500" /> <span className="font-semibold text-gray-600">Inbox</span>
        </Link>
      </div>

      <div className="flex flex-col gap-2 p-2">
        {isLoading && <ListSkeleton />}
        {noteList?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
