import { Link, useParams } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'

import { useMainPath } from '&/common/hooks/use-main-path'
import { useDeleteRoutine } from '&/modules/routine/hooks'

export function RoutineHeader() {
  const { routineId } = useParams()
  const { mainPath } = useMainPath()
  const { onDeleteRoutine } = useDeleteRoutine()
  const onDelete = () => onDeleteRoutine(routineId)

  return (
    <div className="flex h-14 w-full items-center justify-between bg-gray-200 px-4 text-gray-400">
      <div className="flex items-center gap-2">
        <button onClick={onDelete} className="h-8 w-8">
          <TrashIcon width={20} />
        </button>
      </div>
      <div>
        <Link to={mainPath} className="h-8 w-8">
          <XCircleIcon width={24} />
        </Link>
      </div>
    </div>
  )
}
