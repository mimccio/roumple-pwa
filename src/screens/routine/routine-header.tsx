import { Link } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'

import { useMainPath } from '&/common/hooks/use-main-path'

interface Props {
  routineId: string
}

export function RoutineHeader({ routineId }: Props) {
  const { mainPath } = useMainPath()
  const onDelete = () => console.log('Delete :', routineId)

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
