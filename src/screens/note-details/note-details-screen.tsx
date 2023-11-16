import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { CreatedAt } from '&/common/components/display/created-at'

import { useGetNoteDetail } from '&/modules/note/hooks'
import { NotFoundDetails, OfflineError } from '../errors'

import { InfoSection } from './parts/info-section'
import { NoteCategory } from './parts/note-category'
import { NoteEditor } from './parts/note-editor'
import { NoteNavbar } from './parts/note-navbar'

export function NoteDetailsScreen() {
  const { note, isLoading, isPaused, routineNoteList } = useGetNoteDetail()

  if (isLoading) return <DetailsLoadingPage />
  if (!note && isPaused) return <OfflineError />
  if (!note) return <NotFoundDetails />

  return (
    <>
      <NoteNavbar note={note} />
      <NoteCategory note={note} />
      <InfoSection note={note} routineNoteList={routineNoteList} />
      <NoteEditor note={note} />
      <CreatedAt createdAt={note.created_at} />
    </>
  )
}
