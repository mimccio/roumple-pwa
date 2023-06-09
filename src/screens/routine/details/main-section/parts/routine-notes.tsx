import { useRoutineNoteList } from '&/modules/routine-note/hooks'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export function RoutineNotes() {
  const { notes } = useRoutineNoteList()

  if (!notes) return null
  return (
    <div className="mx-4 flex flex-col gap-y-2 border-t border-gray-100 pt-8">
      <h4 className="font-bold uppercase text-gray-400 ">Notes</h4>

      <div className="flex flex-col gap-y-2">
        {notes.map((note) => (
          <Link to={`note/${note.id}`} key={note?.id} className="flex items-center gap-x-2 text-gray-500">
            <DocumentTextIcon className=" text-gray-400" height={16} /> {note.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
