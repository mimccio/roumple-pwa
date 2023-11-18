import { CreatedAt } from '&/common/components/display/created-at'
import { DetailsFallback } from '&/common/components/fallbacks/details'

import { useGetNoteDetail } from '&/modules/note/hooks'

import { InfoSection } from './parts/info-section'
import { NoteCategory } from './parts/note-category'
import { NoteEditor } from './parts/note-editor'
import { NoteNavbar } from './parts/note-navbar'

export function NoteDetailsScreen() {
  const { note, isLoading, isPaused, routineNoteList } = useGetNoteDetail()

  if (!note) return <DetailsFallback isLoading={isLoading} isPaused={isPaused} />

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
