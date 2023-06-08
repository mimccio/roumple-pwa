import { ListSkeleton } from '&/common/components/list-skeleton'
import { useNoteList } from '&/modules/note/hooks'
import { MainError } from '&/screens/errors'
import { InboxIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { NoteListItem } from './note-list-item'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

export function NoteListInbox() {
  const { noteList, isLoading, error } = useNoteList()
  console.log('noteList :', noteList)
  if (error) return <MainError />

  return (
    <>
      <Link to="/notes" className="group flex items-center gap-x-4 p-2 px-4">
        <ChevronLeftIcon width={18} className="text-gray-300 transition-colors  group-hover:text-gray-500" />
        <InboxIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-300" />
        <span className="font-semibold text-gray-500 transition-colors  group-hover:text-gray-400">Inbox</span>
      </Link>

      <div className="flex flex-col gap-2 p-2 px-4">
        {isLoading && <ListSkeleton />}
        {noteList?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
