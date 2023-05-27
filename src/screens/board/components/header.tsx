import { ReactNode } from 'react'
import { TagIcon, CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon as CheckBadgeOutlineIcon, ClockIcon as ClockOutlineIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '&/common/components/tooltip'
import { cl } from '&/common/utils'
import { getGroupHoverPeriodColor, getPeriodColor } from '&/modules/routine/utils'
import { ScheduleType } from '&/modules/routine/types'

interface Props {
  title: ReactNode
  showDone: boolean
  showPeriod: boolean
  handleDoneChange: () => void
  type: ScheduleType
  handleShowPeriod: () => void
}

export function Header({ title, showDone, handleDoneChange, showPeriod, type, handleShowPeriod }: Props) {
  const periodColor = getPeriodColor(type)
  const hoverPeriodColor = getGroupHoverPeriodColor(type)

  return (
    <header className=" flex h-14 w-full items-center justify-between border-b-4 border-indigo-500 px-2">
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">{title}</div>
      <div className="flex gap-1">
        <Tooltip message={showPeriod ? 'hide period' : 'show period'}>
          <button onClick={handleShowPeriod} className="group p-2">
            {showPeriod ? (
              <ClockIcon width={20} className={cl('transition-colors', periodColor, hoverPeriodColor)} />
            ) : (
              <ClockOutlineIcon width={20} className={cl('text-gray-400 transition-colors', hoverPeriodColor)} />
            )}
          </button>
        </Tooltip>

        <Tooltip message={showDone ? 'show to do' : 'show done'}>
          <button onClick={handleDoneChange} className="group p-2">
            {showDone ? (
              <CheckBadgeIcon width={20} className="text-green-500 transition-colors group-hover:text-gray-300" />
            ) : (
              <CheckBadgeOutlineIcon
                width={20}
                className="text-gray-400 transition-colors group-hover:text-green-300"
              />
            )}
          </button>
        </Tooltip>
        <button className="p-2">
          <TagIcon width={20} className="text-indigo-500" />
        </button>
      </div>
    </header>
  )
}
