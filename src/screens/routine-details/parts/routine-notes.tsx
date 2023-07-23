import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

import { useRoutineNoteList, useDeleteRoutineNote } from '&/modules/routine-note/hooks'

export function RoutineNotes() {
  const { t } = useTranslation('common')
  const { routineNotes } = useRoutineNoteList()
  const { onDelete } = useDeleteRoutineNote()

  if (!routineNotes?.length) return null
  return (
    <div className="flex flex-col gap-y-2 border-t border-gray-100 p-4">
      <h4 className="font-bold uppercase text-gray-400 ">{t('notes')}</h4>

      <div className="flex flex-col gap-y-2">
        {routineNotes.map((note) => (
          <div key={note?.id} className="flex justify-between">
            <Link to={`note/${note.note.id}`} className="flex items-center gap-x-2 text-gray-500">
              <DocumentTextIcon className=" text-gray-400" height={16} /> {note.note.title}
            </Link>
            <button onClick={() => onDelete(note)} className="rounded-md p-1">
              <XMarkIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
