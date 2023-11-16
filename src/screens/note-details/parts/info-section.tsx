import { Note } from '&/modules/note/types'
import { RoutineNoteByNote } from '&/modules/routine-note/types'
import { NoteFolder } from './note-folder'
import { NoteLinks } from './note-links'

interface Props {
  note: Note
  routineNoteList?: RoutineNoteByNote[]
}

export function InfoSection({ note, routineNoteList }: Props) {
  return (
    <section className="flex flex-col gap-y-1 border-b bg-gray-100 px-4 py-2">
      <NoteFolder note={note} />
      <NoteLinks note={note} routineNoteList={routineNoteList} />
    </section>
  )
}
