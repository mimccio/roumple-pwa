import { Note } from '&/modules/note/types'
import { NoteCategory } from './note-category'

interface Props {
  note: Note
}

export function InfoSection({ note }: Props) {
  return (
    <section className="flex flex-col border-b bg-gray-100 p-4">
      {/* <RoutineSchedule routine={routine} date={date} />
    <RoutineCategory routine={routine} />
    <CreatedAt createdAt={routine.created_at} /> */}

      <NoteCategory note={note} />
    </section>
  )
}
