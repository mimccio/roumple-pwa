import { ListSkeleton } from '&/common/components/list-skeleton'
import { useNoteFolder } from '&/modules/note-folder/hooks'
import { useNoteList } from '&/modules/note/hooks/use-note-list'
import { MainError } from '&/screens/errors'
import { NoteListItem } from './note-list-item'
import { FolderTitle } from './folder-title'

export function NoteListFolder() {
  const { folder, error: folderError } = useNoteFolder()
  const { noteList, isLoading: listIsLoading, error: listError } = useNoteList()

  if (folderError || listError) return <MainError />

  return (
    <>
      {folder && <FolderTitle folder={folder} />}

      <div className="flex flex-col gap-2 p-2 px-4">
        {listIsLoading && <ListSkeleton />}
        {noteList?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
