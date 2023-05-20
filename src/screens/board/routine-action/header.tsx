import { Link, useParams } from 'react-router-dom'
import { XCircleIcon, EyeIcon } from '@heroicons/react/24/solid'

import { useMainPath } from '&/common/hooks/use-main-path'
import type { Routine } from '&/modules/routine/types'
import { BOARD_TYPES } from '&/modules/routine/constants'
import { useUpsertAction } from '&/modules/routine/hooks'
import { DoneButton } from '../components/done-button'

interface Props {
  routine: Routine
}

const date = new Date()

export function Header({ routine }: Props) {
  const { nav } = useParams()
  const { mainPath } = useMainPath()

  const getBoardType = () => {
    if (nav === 'today' || nav === 'week' || nav === 'month' || nav === 'tomorrow') return BOARD_TYPES[nav]
  }

  const { handleUpdateStatus } = useUpsertAction({ date, type: routine.type, boardType: getBoardType() })

  return (
    <div className="flex h-14 w-full items-center justify-between bg-gray-200 px-4 text-gray-400">
      <div className="flex items-center gap-4">
        <DoneButton routine={routine} handleUpdateStatus={handleUpdateStatus} />
        <h2 className="font-semibold capitalize text-gray-700">{routine.name}</h2>
      </div>
      <div className=" flex items-center gap-4">
        <Link to={`/routines/d/routine/${routine.id}`} className="flex h-8 w-8 items-center justify-center">
          <EyeIcon width={24} />
        </Link>
        <Link to={mainPath} className="flex h-8 w-8 items-center justify-center">
          <XCircleIcon width={24} />
        </Link>
      </div>
    </div>
  )
}
