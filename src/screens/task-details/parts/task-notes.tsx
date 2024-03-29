import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

import { useTaskNoteList, useDeleteTaskNote } from '&/modules/task-note/hooks'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function TaskNotes() {
  const { t } = useTranslation('common')
  const { taskNotes } = useTaskNoteList()
  const { onDelete } = useDeleteTaskNote()

  if (!taskNotes?.length) return null
  return (
    <div className="flex flex-col gap-y-2 p-4">
      <h4 className="font-semibold text-gray-400 ">{t('notes')}</h4>

      <div className="flex flex-col gap-y-1">
        {taskNotes.map((taskNote) => (
          <div key={taskNote?.id} className="flex justify-between">
            <Link to={`note/${taskNote.note.id}`} className="flex items-center gap-x-2 text-gray-500">
              <DocumentTextIcon className=" text-gray-400" height={16} /> {taskNote.note.title}
            </Link>
            <button onClick={() => onDelete(taskNote)} className="rounded-md p-1">
              <XMarkIcon width={20} height={20} className="text-gray-400 transition-colors hover:text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
