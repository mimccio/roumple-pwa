import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

import type { RoutineNoteByRoutine } from '&/modules/routine-note/types'
import { useDeleteRoutineNote } from '&/modules/routine-note/hooks'

interface Props {
  routineNoteList?: RoutineNoteByRoutine[]
}

export function RoutineNotes({ routineNoteList }: Props) {
  const { t } = useTranslation('common')
  const { onDelete } = useDeleteRoutineNote()

  if (!routineNoteList?.length) return null
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-2  p-4">
      <h4 className="font-semibold text-gray-400 ">{t('notes')}</h4>

      <ul className="flex flex-col gap-y-1">
        {routineNoteList.map((routineNote) => (
          <li key={routineNote.id} className="flex justify-between">
            <Link to={`note/${routineNote.note.id}`} className="flex items-center gap-x-2 text-gray-500">
              <DocumentTextIcon className=" text-gray-400" height={16} /> {routineNote.note.title}
            </Link>
            <button onClick={() => onDelete(routineNote)} className="rounded-md p-1">
              <XMarkIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
