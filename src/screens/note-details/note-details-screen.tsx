import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useNoteDetail } from '&/modules/note/hooks/use-note-detail'
import { NotFoundDetails, OfflineError } from '../errors'
import { NoteEditor } from './parts/note-editor'
import { NoteNavbar } from './parts/note-navbar'

export function NoteDetailsScreen() {
  const { note, isLoading, isPaused } = useNoteDetail()

  if (!note && isPaused) return <OfflineError />
  if (!note) return <NotFoundDetails />

  return (
    <>
      <NoteNavbar note={note} />
      {isLoading && <DetailsLoadingPage />}
      {note && <NoteEditor note={note} />}
    </>
  )
}
