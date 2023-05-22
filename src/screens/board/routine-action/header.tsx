import { Link } from 'react-router-dom'
import { XCircleIcon, EyeIcon } from '@heroicons/react/24/solid'

import { useMainPath } from '&/common/hooks/use-main-path'
import type { Routine } from '&/modules/routine/types'

import { useUpsertAction } from '&/modules/routine/hooks'
import { DoneButton } from '../components/done-button'
import { Tooltip } from '&/common/components/tooltip'

interface Props {
  routine: Routine
  date: Date
}

export function Header({ routine, date }: Props) {
  const { mainPath } = useMainPath()

  const { handleUpdateStatus } = useUpsertAction({ type: routine.type, date })

  return (
    <div className="flex h-14 w-full items-center justify-between bg-gray-200 px-4 text-gray-400">
      <div className="flex items-center gap-4">
        <DoneButton routine={routine} handleUpdateStatus={handleUpdateStatus} />
        <h2 className="font-semibold capitalize text-gray-700">{routine.name}</h2>
      </div>
      <div className=" flex items-center gap-4">
        <Tooltip message="show routine">
          <Link to={`/routines/d/routine/${routine.id}`} className="group flex h-8 w-8 items-center justify-center">
            <EyeIcon className="transition-colors group-hover:text-gray-500" width={24} />
          </Link>
        </Tooltip>
        <Tooltip message="close">
          <Link to={mainPath} className="group flex h-8 w-8 items-center justify-center">
            <XCircleIcon className="transition-colors group-hover:text-gray-500" width={24} />
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}
