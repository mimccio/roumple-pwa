import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { FlagIcon } from '@heroicons/react/20/solid'

import { useMainPath } from '&/common/hooks/use-main-path'

export function RoutineHeader() {
  const { mainPath } = useMainPath()

  return (
    <div className="flex h-14 w-full items-center justify-between bg-gray-200 px-4">
      <div className="flex items-center gap-2">
        <button className="h-8 w-8">
          <FlagIcon width={20} />
        </button>
        <h3 className="pb-1 font-semibold text-gray-700">Routine name</h3>
      </div>
      <div>
        <Link to={mainPath} className="h-8 w-8">
          <XMarkIcon width={24} />
        </Link>
      </div>
    </div>
  )
}
