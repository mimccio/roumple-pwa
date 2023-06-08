import { CreatedAt } from '&/common/components/display/created-at'
import { Note } from '&/modules/note/types'
import { NoteCategory } from './note-category'

interface Props {
  note: Note
}

export function InfoSection({ note }: Props) {
  return (
    <section className="flex flex-col border-b bg-gray-100 px-4 py-2">
      {/* <RoutineSchedule routine={routine} date={date} />
    <RoutineCategory routine={routine} />
   */}

      <NoteCategory note={note} />
      <CreatedAt createdAt={note.created_at} />
    </section>
  )
}
