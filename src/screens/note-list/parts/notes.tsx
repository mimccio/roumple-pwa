import { useNoteFolder } from '&/modules/note-folder/hooks'
import { MainError, OfflineError } from '&/screens/errors'
import { FolderTitle } from './folder-title'
import { Loading } from './loading'
import { NoteListFolder } from './note-list-folder'

export function Notes() {
  const { folder, show } = useNoteFolder()

  if (show.offline) return <OfflineError />
  if (show.error) return <MainError />
  if (show.loading) return <Loading />

  return (
    <>
      {folder && <FolderTitle folder={folder} />}
      <NoteListFolder />
    </>
  )
}
