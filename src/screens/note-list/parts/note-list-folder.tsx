import { ListSkeleton } from '&/common/components/list-skeleton'
import { useNoteList } from '&/modules/note/hooks/use-note-list'
import { MainError, OfflineError } from '&/screens/errors'
import { NoteListItem } from './note-list-item'

export function NoteListFolder() {
  const { noteList, show } = useNoteList()

  if (show.offline) return <OfflineError />
  if (show.error) return <MainError />

  return (
    <>
      <div className="flex flex-col gap-2 p-2 px-4">
        {show.loading && <ListSkeleton />}
        {show.empty && <p className="ml-8 text-sm font-semibold text-gray-300">Empty folder</p>}
        {noteList?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
