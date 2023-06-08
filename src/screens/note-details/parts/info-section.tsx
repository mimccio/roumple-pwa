import { CreatedAt } from '&/common/components/display/created-at'
import { Note } from '&/modules/note/types'
import { NoteCategory } from './note-category'
import { NoteFolder } from './note-folder'

interface Props {
  note: Note
}

export function InfoSection({ note }: Props) {
  return (
    <section className="flex flex-col border-b bg-gray-100 px-4 py-2">
      <NoteCategory note={note} />
      <NoteFolder note={note} />
      <CreatedAt createdAt={note.created_at} />
    </section>
  )
}
