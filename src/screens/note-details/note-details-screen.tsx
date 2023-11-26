import { CreatedAt } from '&/common/components/display/created-at'
import { DetailsFallback } from '&/common/components/fallbacks/details'

import { useGetNoteDetail } from '&/modules/note/hooks'
import { LinkedRoutines } from './parts/linked-routines'
import { LinkedTasks } from './parts/linked-tasks'
import { NoteCategory } from './parts/note-category'
import { NoteEditor } from './parts/note-editor'
import { NoteFolder } from './parts/note-folder'
import { NoteNavbar } from './parts/note-navbar'

export function NoteDetailsScreen() {
  const { note, isLoading, isPaused, routineNoteList } = useGetNoteDetail()

  if (!note) return <DetailsFallback isLoading={isLoading} isPaused={isPaused} />

  return (
    <>
      <NoteNavbar note={note} />
      <NoteCategory note={note} />
      <NoteFolder note={note} />
      <LinkedRoutines routineNoteList={routineNoteList} />
      <LinkedTasks taskNoteList={note.taskNotes} />
      <NoteEditor note={note} />
      <CreatedAt createdAt={note.created_at} />
    </>
  )
}
