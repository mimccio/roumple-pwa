import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowPathRoundedSquareIcon, CheckCircleIcon, LinkIcon } from '@heroicons/react/24/outline'

import { DetailsInfoPopover } from '&/common/components/popovers/details-info-popover'
import type { RoutineNoteByNote } from '&/modules/routine-note/types'
import type { Note } from '&/modules/note/types'

interface Props {
  note: Note
  routineNoteList?: RoutineNoteByNote[]
}

export function NoteLinks({ note, routineNoteList }: Props) {
  const { t } = useTranslation(['common', 'note'])
  const routineCount = routineNoteList?.length || 0
  const taskCount = note.taskNotes?.filter((item) => !item.deleted)?.length || 0

  if (!routineCount && !taskCount) return null

  const getText = () => {
    if (routineCount > 0 && taskCount > 0) {
      return `${t('routineNumber', { ns: 'note', count: routineCount })} ${t('and', { ns: 'note' })} ${t('taskNumber', {
        ns: 'note',
        count: taskCount,
      })}`
    }
    if (routineCount > 0) {
      return t('routineNumber', { ns: 'note', count: routineCount })
    }
    if (taskCount > 0) {
      return t('taskNumber', { ns: 'note', count: taskCount })
    }
  }

  return (
    <DetailsInfoPopover
      buttonContent={
        <p className="flex items-center gap-x-3 py-1.5 text-sm text-gray-400">
          <LinkIcon height={16} width={16} className="text-gray-300" />
          {t('linkedTo', { ns: 'note' })} {getText()}
        </p>
      }
    >
      <div className="flex flex-col gap-y-8">
        {routineCount > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-x-2 font-semibold text-gray-500">
              <ArrowPathRoundedSquareIcon className="text-gray-400" width={18} />{' '}
              {t('linkedRoutines', { ns: 'note', count: routineCount })}
            </h4>
            <ul className="flex flex-col gap-y-1">
              {routineNoteList?.map((routineNote) => (
                <Link
                  className="truncate text-gray-600 transition-colors hover:text-gray-500"
                  key={routineNote.routine.id}
                  to={`/routines/d/routine/${routineNote.routine.id}`}
                >
                  {routineNote.routine.name}
                </Link>
              ))}
            </ul>
          </div>
        )}

        {taskCount > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-x-2 font-semibold text-gray-500">
              <CheckCircleIcon className="text-gray-400" width={18} />{' '}
              {t('linkedTasks', { ns: 'note', count: taskCount })}
            </h4>
            <ul className="flex flex-col gap-y-1">
              {note.taskNotes?.map((taskNote) => (
                <Link
                  className="truncate text-gray-600 transition-colors hover:text-gray-500"
                  key={taskNote.task.id}
                  to={`/tasks/d/task/${taskNote.task.id}`}
                >
                  {taskNote.task.name}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DetailsInfoPopover>
  )
}
