import { CreatedAt } from '&/common/components/display/created-at'
import { Note } from '&/modules/note/types'
import { RoutineNoteByNote } from '&/modules/routine-note/types'
import { NoteCategory } from './note-category'
import { NoteFolder } from './note-folder'
import { NoteLinks } from './note-links'

interface Props {
  note: Note
  routineNoteList?: RoutineNoteByNote[]
}

export function InfoSection({ note, routineNoteList }: Props) {
  return (
    <section className="flex flex-col gap-y-1 border-b bg-gray-100 px-4 py-2">
      <NoteCategory note={note} />
      <NoteFolder note={note} />
      <NoteLinks note={note} routineNoteList={routineNoteList} />
      <CreatedAt createdAt={note.created_at} />
    </section>
  )
}
