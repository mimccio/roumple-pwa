import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'

import { DetailsInfoPopover } from '@/common/components/popovers/details-info-popover'
import { RoutineNoteByNote } from '@/modules/routine-note/types'

interface Props {
  routineNoteList?: RoutineNoteByNote[]
}

export function LinkedRoutines({ routineNoteList }: Props) {
  const { t } = useTranslation('note')

  const count = routineNoteList?.length
  if (!count) return null

  return (
    <DetailsInfoPopover text={t('linkedRoutineCount', { ns: 'note', count })} Icon={ArrowPathRoundedSquareIcon}>
      <div>
        <h4 className="mb-2 flex items-center gap-x-2 font-semibold text-gray-500">
          <ArrowPathRoundedSquareIcon className="text-gray-400" width={14} />{' '}
          {t('linkedRoutines', { ns: 'note', count })}
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
    </DetailsInfoPopover>
  )
}
