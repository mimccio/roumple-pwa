import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

import { DetailsInfoPopover } from '@/common/components/popovers/details-info-popover'
import { TaskNote } from '@/modules/note/types'

interface Props {
  taskNoteList?: TaskNote[]
}

export function LinkedTasks({ taskNoteList }: Props) {
  const { t } = useTranslation('note')
  const count = taskNoteList?.length
  if (!count) return null

  return (
    <DetailsInfoPopover text={t('linkedTasksCount', { ns: 'note', count })} Icon={CheckCircleIcon}>
      <h4 className="mb-2 flex items-center gap-x-2 font-semibold text-gray-500">
        <CheckCircleIcon className="text-gray-400" width={14} /> {t('linkedTasks', { ns: 'note', count })}
      </h4>
      <ul className="flex flex-col gap-y-1">
        {taskNoteList?.map((taskNote) => (
          <Link
            className="truncate text-gray-600 transition-colors hover:text-gray-500"
            key={taskNote.task.id}
            to={`/routines/d/task/${taskNote.task.id}`}
          >
            {taskNote.task.name}
          </Link>
        ))}
      </ul>
    </DetailsInfoPopover>
  )
}
